import { NS } from "@ns";
import { list_servers, list_servers_deps } from "./lib/list-servers";

export function root_server_deps(ns: NS) {
	ns.brutessh;
	ns.ftpcrack;
	ns.relaysmtp;
	ns.httpworm;
	ns.sqlinject;
	ns.nuke;
	ns.hasRootAccess;
}

export function root_server(ns: NS, target: string) {
	try {
		ns["brutessh"](target);
	} catch {}
	try {
		ns["ftpcrack"](target);
	} catch {}
	try {
		ns["relaysmtp"](target);
	} catch {}
	try {
		ns["httpworm"](target);
	} catch {}
	try {
		ns["sqlinject"](target);
	} catch {}
	try {
		ns["nuke"](target);
	} catch {}
	return ns["hasRootAccess"](target);
}

export async function main(ns: NS) {
	list_servers_deps;
	root_server_deps;
	const rooted = list_servers(ns).filter((s) => root_server(ns, s));
	rooted.forEach((s) => ns.tprintf(s));
}
