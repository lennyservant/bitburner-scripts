import { NS } from "@ns";
import { test_solver } from "./test-solver";

function wait() {
	return new Promise<void>((r) => {
		setTimeout(r, 0);
	});
}

export default async function solve(input: number) {
	let current = input;
	top: while (true) {
		for (let i = 2; i < input + 1; i++) {
			if (current == i) return current;
			if (current % i == 0) {
				current /= i;
				continue top;
			}
			if (i % 1000000 == 0) {
				await wait();
			}
		}
		break;
	}
	throw "this shouldn't be reached";
}

export async function main(ns: NS) {
	await test_solver(ns, "Find Largest Prime Factor", solve);
}
