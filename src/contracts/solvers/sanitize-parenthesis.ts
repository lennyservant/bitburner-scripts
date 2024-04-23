import { NS } from "@ns";
import { test_solver } from "./test-solver";

// TODO: implement
export default async function solve(i: any) {
	console.log(i);
}

export async function main(ns: NS) {
	await test_solver(ns, "Sanitize Parentheses in Expression", solve);
}
