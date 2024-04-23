import { NS } from "@ns";
import { list_servers, list_servers_deps } from "../lib/list-servers";

export function list_contracts_deps(ns: NS) {
	list_servers_deps;
	ns.ls;
}

export function list_contracts(
	ns: NS
): (readonly [server: string, contracts: string[]])[] {
	const servers = list_servers(ns).map(
		(s) => [s, ns.ls(s).filter((f) => f.endsWith(".cct"))] as const
	);
	return servers.filter(([_, c]) => c.length > 0);
}

export async function main(ns: NS) {
	list_contracts_deps;
	list_contracts(ns).forEach(([s, _]) => ns.tprintf(s));
}
