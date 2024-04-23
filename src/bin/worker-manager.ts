import { rejects } from "assert";
import { WorkerClosure, WorkerClosureReturn } from "./worker";

// TODO: probably make this generic
interface WorkerInterface {
	closure?: WorkerClosure;
	promise?: Promise<unknown>;
	resolve?: (value: any) => void;
	reject?: (reason: any) => void;
}

export class WorkerManager {
	static workers = new Map<number, WorkerInterface>();
	static add_worker<T extends WorkerClosure>(
		pid: number,
		closure: T
	): Promise<WorkerClosureReturn<T>> {
		const worker_object: WorkerInterface = {
			closure: closure,
			promise: undefined,
			resolve: undefined,
			reject: undefined,
		};
		const promise = new Promise<WorkerClosureReturn<T>>((resolve, reject) => {
			worker_object.resolve = resolve;
			worker_object.reject = reject;
		}).finally(() => {
			worker_object.closure = undefined;
			worker_object.promise = undefined;
			this.workers.delete(pid);
		});
		worker_object.promise = promise;
		this.workers.set(pid, worker_object);
		return promise;
	}
}
