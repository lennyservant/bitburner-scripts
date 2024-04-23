import { NS } from "@ns";
import { test_solver } from "./test-solver";

interface IPNode {
	id: string;
	depth: number;
	nodes: IPNode[];
}

export default async function solve(i: string) {
	const INVALID = { id: "INVALID", depth: -1, nodes: [] };
	const gen_ip_tree = (id: string, depth = 0): IPNode[] => {
		const nodes: IPNode[] = [];
		for (let i = 0; i < Math.min(3, id.length); i++) {
			const node_id = id.slice(0, i + 1);
			const int_id = parseInt(node_id);
			if (int_id > 255) continue; // invalid, more than 255
			if (`${int_id}` != node_id) continue; // invalid, starts with 0
			if (depth > 3 && id.length > 0) {
				nodes.push(INVALID);
				break;
			}
			const child_nodes = gen_ip_tree(id.slice(i + 1), depth + 1);
			if (child_nodes.length > 0 && child_nodes.every((c) => c == INVALID)) {
				nodes.push(INVALID);
				continue;
			}
			nodes.push({
				id: node_id,
				depth: depth,
				nodes: child_nodes,
			});
		}
		return nodes;
	};

	const filter_tree = (nodes: IPNode[]): IPNode[] => {
		return nodes.filter(
			(n) => ((n.nodes = filter_tree(n.nodes)), n != INVALID)
		);
	};

	const flatten_node = (node: IPNode) => {
		const ip_strings: string[] = [];
		if (node.nodes.length == 0) return [`${node.id}`];
		node.nodes.forEach((n) =>
			ip_strings.push(...flatten_node(n).map((s) => `${node.id}.${s}`))
		);
		return ip_strings;
	};

	const filtered = filter_tree(gen_ip_tree(i));
	return filtered.flatMap(flatten_node);
}

export async function main(ns: NS) {
	await test_solver(ns, "Generate IP Addresses", solve);
}
