import { dodge_ram } from "@/lib/dodge-ram";
import { NS } from "@ns";
import { ContractTypes } from "../contract-names";

export async function test_solver(
	ns: NS,
	contract_type: ContractTypes,
	solve: (i: any) => Promise<any>
) {
	const filename = await dodge_ram(ns, (n) =>
		n.codingcontract["createDummyContract"](contract_type)
	);
	const input = await dodge_ram(ns, (n) =>
		n.codingcontract["getData"](filename)
	);
	const contract_description = await dodge_ram(ns, (n) =>
		n.codingcontract["getDescription"](filename)
	);
	console.log(contract_description);
	const answer = await solve(input);
	ns.tprintf(`passing answer of ${answer}`);
	let error: any = undefined;
	let result;
	try {
		result = await dodge_ram(
			ns,
			(n) => n.codingcontract["attempt"](answer, filename),
			10
		);
	} catch (e) {
		result = "";
		error = e;
	}
	if (typeof result == "string" && result != "") ns.tprintf(`solver works`);
	else ns.tprintf(`solver doesnt work :( \n${error}`);
	await dodge_ram(ns, (n) => n["rm"](filename, "home"));
}
