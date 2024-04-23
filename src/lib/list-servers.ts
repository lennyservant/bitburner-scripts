import { NS } from "@ns";

export function list_servers_deps(ns: NS) {
	ns.scan;
}

export function list_servers(ns: NS) {
	const servers = ["home"];
	for (const server of servers) {
		servers.push(...ns["scan"](server).filter((s) => !servers.includes(s)));
	}
	return servers;
}

export async function main(ns: NS) {
	list_servers_deps;
	list_servers(ns).forEach((s) => ns.tprintf(s));
}
