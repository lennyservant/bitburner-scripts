import { NS, RunOptions } from "@ns";
import { WorkerManager } from "./worker-manager";

export type WorkerClosure<T = unknown> = (ns: NS) => Promise<T>;
export type WorkerClosureReturn<T> = T extends WorkerClosure<infer R>
	? R
	: never;

const workerScriptPath = $scriptName();
const defaultOptions: RunOptions = {
	temporary: true,
	preventDuplicates: false,
	ramOverride: 1.75, // hack/weaken/grow lol
};

export function start_worker<T extends WorkerClosure>(
	ns: NS,
	host: string,
	closure: T,
	options: RunOptions = {}
) {
	const previous = ns.isLogEnabled("exec");
	ns.disableLog("exec");
	const pid = ns.exec(workerScriptPath, host, {
		...defaultOptions,
		...options,
	});
	previous && ns.enableLog("exec");
	if (pid == 0) throw new SyntaxError("failed to start exec");
	const promise = WorkerManager.add_worker(pid, closure);
	return { pid: pid, promise: promise } as const;
}

async function run_closure(ns: NS) {
	const worker = WorkerManager.workers.get(ns.pid);
	if (worker?.closure == undefined) throw "closure undefined";
	if (worker?.resolve == undefined) throw "resolve undefined";
	if (worker?.reject == undefined) throw "reject undefined";
	if (worker?.promise == undefined) throw "promise undefined";
	let result;
	try {
		result = await worker.closure(ns);
	} catch (e) {
		worker.reject(e);
	}
	return worker.resolve(result);
}

export async function main(ns: NS) {
	await run_closure(ns);
}
