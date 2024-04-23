import { NS } from "@ns";
import { list_contracts } from "./list-contracts";
import { dodge_ram } from "@/lib/dodge-ram";
import solvers from "./solvers";
import { ContractTypes } from "./contract-names";

export async function main(ns: NS) {
	const server_contracts = await dodge_ram(ns, list_contracts);
	for (const [server, contracts] of server_contracts) {
		for (const contract of contracts) {
			const contract_type = await dodge_ram(
				ns,
				(n) =>
					n.codingcontract["getContractType"](contract, server) as ContractTypes
			);
			const solver = solvers[contract_type];
			if (solver == undefined) continue;
			console.log(`[${server}:${contract}] found solver for ${contract_type}`);
			const input = await dodge_ram(ns, (n) =>
				n.codingcontract["getData"](contract, server)
			);
			const answer = await solver(input);
			const result = await dodge_ram(
				ns,
				(n) => n.codingcontract["attempt"](answer, contract, server),
				10
			);
			if (result != "") ns.tprintf(`solved [${server}:${contract}]: ${result}`);
			else ns.tprintf(`WARN: failed attempt on [${server}:${contract}]`);
		}
	}
}
