import { NS } from "@ns";
import { test_solver } from "./test-solver";

type Input = readonly [sum: number, numbers: number[]];

export default async function solve(i: Input) {
	const [sum, numbers] = i;
	const memo = new Map<string, number>();
	const recurse_solve = (sum: number, n: number): number => {
		const map_key = `${sum}:${n}`;
		if (sum == 0) return memo.set(map_key, 1), 1;
		if (n == 0 || sum < 0) return 0;
		const memd_sum = memo.get(map_key);
		if (memd_sum != undefined) return memd_sum;
		const count =
			recurse_solve(sum - numbers[n - 1], n) + recurse_solve(sum, n - 1);
		memo.set(map_key, count);
		return count;
	};
	return recurse_solve(sum, numbers.length);
}

export async function main(ns: NS) {
	await test_solver(ns, "Total Ways to Sum II", solve);
}
