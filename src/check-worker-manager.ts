import { NS } from "@ns";
import { WorkerManager } from "./bin/worker-manager";

export async function main(ns: NS) {
	console.log(WorkerManager.workers);
}
