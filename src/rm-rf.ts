import { NS } from "@ns";

export async function main(ns: NS) {
	const [end = ".js"] = ns.args as [string];
	ns.ls("home")
		.filter((s) => s.endsWith(end))
		.forEach((s) => ns.rm(s, "home"));
}
