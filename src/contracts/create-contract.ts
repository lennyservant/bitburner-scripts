import { NS } from "@ns";
import { ContractTypes, CONTRACT_NAMES } from "./contract-names";

declare module "@ns" {
	export interface CodingContract {
		createDummyContract(type: ContractTypes & {}): string;
	}
	export interface NS {
		readonly codingcontract: CodingContract;
	}
}

export async function main(ns: NS) {
	ns.ls("home")
		.filter((s) => s.endsWith(".cct"))
		.forEach((s) => ns.rm(s, "home"));
	CONTRACT_NAMES.map(
		(s) => [s, ns.codingcontract.createDummyContract(s)] as const
	).forEach((f) => ns.tprintf(`${f[0].padEnd(40)} ${f[1]}`));
}
