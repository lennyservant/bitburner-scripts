/* eslint-env node */
import { defineConfig } from "viteburner";
import { resolve } from "path";
import type { Plugin } from "vite";

function transformBCss() {
	const moduleCSSFilter = /\.module\.bcss$/;
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
	} satisfies Plugin;
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
			{ pattern: "src/**/*.{js,ts}", transform: true },
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
			{ pattern: "src/**/*.{script,txt}" },
		],
		sourcemap: "inline",
	},

	plugins: [transformBCss()],

	esbuild: {
		jsx: `transform`,
	},
});
