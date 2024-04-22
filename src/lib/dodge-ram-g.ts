import { NSClosure, NSClosureReturn } from "./dodge-ram";

export class RamDodger {
	static closure_func?: NSClosure<unknown> = undefined;
	static closure_promise?: Promise<any> = undefined;
	static closure_resolve?: (value: any) => void = undefined;
	static closure_reject?: (reason: any) => void = undefined;
	static set_closure<T extends NSClosure>(
		closure: T
	): Promise<NSClosureReturn<T>> {
		if (this.closure_promise) throw "promise already exists";
		this.closure_promise = new Promise((resolve, reject) => {
			this.closure_resolve = resolve;
			this.closure_reject = reject;
		}).finally(() => {
			this.closure_func = undefined;
			this.closure_promise = undefined;
		});
		this.closure_func = closure;
		return this.closure_promise;
	}
}
