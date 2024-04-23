import { NS } from "@ns";
import { RamManager } from "./dodge-ram-manager";

const dodgeRamFile = $scriptName();
const baseCost = 1.6 + 1.3; // base + exec

export type NSClosure<T = any> = (ns: NS) => T;
export type NSClosureReturn<C> = C extends NSClosure<infer T> ? T : never;

export async function dodge_ram<T extends NSClosure>(
	ns: NS,
	closure: T,
	cost = 8 - baseCost
): Promise<NSClosureReturn<T>> {
	if (RamManager.closure_promise) {
		await RamManager.closure_promise;
	}
	ns.disableLog("disableLog");
	ns.disableLog("enableLog");
	const previous = ns.isLogEnabled("exec");
	ns.disableLog("exec");
	const pid = ns.exec(dodgeRamFile, "home", {
		temporary: true,
		ramOverride: baseCost + cost,
	});
	previous && ns.enableLog("exec");

	if (pid == 0) throw "failed to exec ramdodger";
	const promise = RamManager.set_closure(closure);
	let result;
	try {
		result = await promise;
	} catch (e) {
		if (e instanceof Error || Object.hasOwn(e as object, "pid")) throw e;
		throw new Error(e as string);
	}
	return result;
}

function is_thenable(o: unknown): o is PromiseLike<unknown> {
	if (Object.hasOwn(o as object, "then")) return true;
	return false;
}

function run_closure(ns: NS) {
	try {
		if (RamManager.closure_func == undefined) throw "closure_func not defined";
		const result = RamManager.closure_func(ns);
		if (is_thenable(result)) {
			result.then(RamManager.closure_resolve, RamManager.closure_reject);
			return result;
		}
		RamManager.closure_resolve?.(result);
	} catch (e) {
		RamManager.closure_reject?.(e);
	}
}

export function main(ns: NS) {
	return run_closure(ns);
}
