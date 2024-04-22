import { NS } from "@ns";
import { RamDodger } from "./dodge-ram-g";

const dodgeRamFile = "lib/dodge-ram.js";
const baseCost = 1.6 + 1.3; // base + exec

export type NSClosure<T = any> = (ns: NS) => T;
export type NSClosureReturn<C> = C extends NSClosure<infer T> ? T : never;

export async function dodgeRam<T extends NSClosure>(
	ns: NS,
	closure: T,
	cost = 8 - baseCost
): Promise<NSClosureReturn<T>> {
	if (RamDodger.closure_promise) {
		await RamDodger.closure_promise;
	}
	const pid = ns.exec(dodgeRamFile, "home", {
		temporary: true,
		ramOverride: baseCost + cost,
	});
	if (pid == 0) throw "failed to exec ramdodger";
	const promise = RamDodger.set_closure(closure);
	let result;
	try {
		result = await promise;
	} catch (e) {
		if (e instanceof Error || Object.hasOwn(e as object, "pid")) throw e;
		throw new Error(e as string);
	}
	return result;
}

function isThenable(o: unknown): o is PromiseLike<unknown> {
	if (Object.hasOwn(o as object, "then")) return true;
	return false;
}

function runClosure(ns: NS) {
	try {
		if (RamDodger.closure_func == undefined) throw "closure_func not defined";
		const result = RamDodger.closure_func(ns);
		if (isThenable(result)) {
			result.then(RamDodger.closure_resolve, RamDodger.closure_reject);
			return result;
		}
		RamDodger.closure_resolve?.(result);
	} catch (e) {
		RamDodger.closure_reject?.(e);
	}
}

export function main(ns: NS) {
	return runClosure(ns);
}
