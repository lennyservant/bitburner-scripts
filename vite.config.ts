/* eslint-env node */
import { defineConfig } from "viteburner";
import { resolve } from "path";
import type { Plugin } from "vite";
import AST from "unplugin-ast/vite";
import type { Transformer } from "unplugin-ast";
import type { StringLiteral } from "@babel/types";
import { readFile } from "fs/promises";

function applyScriptNameMacro(): Transformer<StringLiteral> {
	return {
		onNode: (node) =>
			node.type === "CallExpression" &&
			node.callee.type === "Identifier" &&
			node.callee.name == "$scriptName",
		transform(node, code, context) {
			console.log(`applied macro to ${context.id}`);
			return {
				type: "StringLiteral",
				value: context.id
					.slice(__dirname.length)
					.replace(/\.[jt]sx?$/, ".js")
					.replace(/^\/src\//, ""),
			};
		},
	};
}

function transformBCss(): Plugin {
	const cssFilter = /\.bcss$/;
	return {
		name: "lenny-bcss-transform",
		transform(css, id, options) {
			switch (true) {
				case cssFilter.test(id): // TODO: figure out how to get typedefs from css files out
					return {
						code: `export default \`${css}\``,
						map: null,
					};
			}
		},
	};
}

function wasm(): Plugin {
	const wasmFilter = /\.wasm$/;
	return {
		name: "lenny-wasm-transform",
		enforce: "pre",
		async load(id, options) {
			if (!wasmFilter.test(id)) return;
			console.log(`trying to load wasm ${id}`);
			const bytes = await readFile(id);
			return {
				code: `export default await WebAssembly.compile(Uint8Array.from(atob("${bytes.toString(
					"base64"
				)}"), c => c.charCodeAt(0)))`,
			};
		},
	};
}

export default defineConfig({
	resolve: {
		// alias: {
		// 	"@": resolve(__dirname, "src"),
		// 	"/src": resolve(__dirname, "src"),
		// 	react: resolve(__dirname, "src", "vendored", "react.js"),
		// 	"react-dom": resolve(__dirname, "src", "vendored", "react-dom.js"),
		// },
		alias: [
			{ find: "@", replacement: resolve(__dirname, "src") },
			{ find: "/src", replacement: resolve(__dirname, "src") },
			{
				find: "react",
				replacement: resolve(__dirname, "src", "vendored", "react.js"),
			},
			{
				find: "react-dom",
				replacement: resolve(__dirname, "src", "vendored", "react-dom.js"),
			},
		],
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		minify: false,
	},
	viteburner: {
		watch: [
			{ pattern: "src/**/!(*.d).{js,ts}", transform: true },
			{
				pattern: "src/**/*.tsx",
				transform: true, // tsx
				location: (file) => ({
					filename: file.replace(/[jt]sx?$/, "js").replace(/^src/, ""),
				}),
			},
			{
				pattern: "src/**/*.bcss",
				transform: true, // css
				location: (file) => ({
					filename: file.replace(/bcss?$/, "js").replace(/^src/, ""),
				}),
			},
			{
				pattern: "src/**/*.wasm",
				transform: true, // css
				location: (file) => ({
					filename: file.replace(/wasm?$/, "js").replace(/^src/, ""),
				}),
			},
			{ pattern: "src/**/*.{script,txt}" },
		],
		sourcemap: "inline",
	},

	plugins: [
		wasm(),
		AST({
			transformer: [applyScriptNameMacro()],
		}),
		transformBCss(),
	],

	esbuild: {
		jsx: `transform`,
	},
});
