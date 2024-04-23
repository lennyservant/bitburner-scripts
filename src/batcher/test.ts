import { dodge_ram } from "@/lib/dodge-ram";
import { start_worker } from "/src/bin/worker";
import { NS } from "@ns";

const h = async (ns: NS, weakenTime: number, target: string) => {
	ns.disableLog("ALL");
	const hacked = await ns["hack"](target, {
		additionalMsec: weakenTime * (1 - 1 / 4),
	});
	console.log(`hack ${ns.pid}`);
	return hacked;
};

const w = async (ns: NS, weakenTime: number, target: string) => {
	ns.disableLog("ALL");
	const weakened = await ns["weaken"](target, {
		additionalMsec: weakenTime * (1 - 4 / 4),
	});
	console.log(`weaken ${ns.pid}`);
	return weakened;
};

const g = async (ns: NS, weakenTime: number, target: string) => {
	ns.disableLog("ALL");
	const grown = await ns["grow"](target, {
		additionalMsec: weakenTime * (1 - 3.2 / 4),
	});
	console.log(`grow ${ns.pid}`);
	return grown;
};

export async function main(ns: NS) {
	ns.disableLog("ALL");
	ns.clearLog();
	console.log("start");
	const target = "n00dles";
	let workers: { pid: number; promise: Promise<number> }[] = [];
	ns.atExit(() => {
		workers.forEach(({ pid }) => ns.kill(pid));
	});
	while (true) {
		const weakenTime = await dodge_ram(ns, (n) => n["getWeakenTime"]("home"));
		workers = [];
		console.log("attempting to start tasks");
		for (let i = 0; i < 16; i++) {
			let p_obj: { pid: number; promise: Promise<number> } | undefined =
				undefined;
			if (i % 4 == 0)
				p_obj = start_worker(
					ns,
					"home",
					async (n) => await h(n, weakenTime, target)
				);
			if (i % 4 == 1)
				p_obj = start_worker(
					ns,
					"home",
					async (n) => await w(n, weakenTime, target)
				);
			if (i % 4 == 2)
				p_obj = start_worker(
					ns,
					"home",
					async (n) => await g(n, weakenTime, target)
				);
			if (i % 4 == 3)
				p_obj = start_worker(
					ns,
					"home",
					async (n) => await w(n, weakenTime, target)
				);
			if (p_obj == undefined) throw "fuck";
			workers.push(p_obj);
		}
		console.log("started tasks");
		const results = await Promise.allSettled(
			workers.map(async (p) => [p.pid, await p.promise] as const)
		);
		console.log("tasks finish");
		console.log(
			results
				.filter((p) => p.status == "fulfilled")
				.map((p) => p.status == "fulfilled" && p.value)
		);
		console.log(
			results
				.filter((p) => p.status == "rejected")
				.map((p) => p.status == "rejected" && p.reason)
		);
		await 0; // clean up ram
	}
}
