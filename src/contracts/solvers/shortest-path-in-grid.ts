import { NS } from "@ns";
import { test_solver } from "./test-solver";

const enum GridCell {
	EMPTY = 0,
	OBSTACLE = 1,
}

const directions = ["D", "R", "U", "L"] as const;
type Direction = "D" | "R" | "U" | "L" | "";

const direction_vector = {
	D: [0, 1],
	R: [1, 0],
	U: [0, -1],
	L: [-1, 0],
} as const;

export default async function solve(i: GridCell[][]) {
	const bottom = i.length - 1;
	const right = i[bottom].length - 1;
	if (i[bottom][right] == GridCell.OBSTACLE) return "";
	const paths = [""];
	const memoPath = new Map([["", [0, 0] as [x: number, y: number]]]);
	const visited = new Set<`${number}:${number}`>();
	for (const path of paths) {
		const [x, y] = memoPath.get(path) ?? [0, 0];
		for (const dir of directions) {
			const [d_x, d_y] = direction_vector[dir];
			const [n_x, n_y] = [x + d_x, y + d_y];
			if (i?.[n_y]?.[n_x] === undefined || i[n_y][n_x] == GridCell.OBSTACLE)
				continue;
			if (visited.has(`${n_x}:${n_y}`)) continue;
			visited.add(`${n_x}:${n_y}`);
			paths.push(`${path}${dir}`);
			memoPath.set(`${path}${dir}`, [n_x, n_y]);
		}
		if (x == right && y == bottom) return path;
	}
	return "";
}

export async function main(ns: NS) {
	await test_solver(ns, "Shortest Path in a Grid", solve);
}
