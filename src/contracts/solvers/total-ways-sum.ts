import { NS } from "@ns";
import { test_solver } from "./test-solver";

export default async function solve(input: number) {
	const mem = Array.from({ length: input + 1 }).fill(0, 1) as number[];
	mem[0] = 1;
	for (let i = 1; i < input; i++) {
		for (let j = i; j <= input; j++) {
			mem[j] += mem[j - i];
		}
	}
	return mem[input];
}

export async function main(ns: NS) {
	await test_solver(ns, "Total Ways to Sum", solve);
}
