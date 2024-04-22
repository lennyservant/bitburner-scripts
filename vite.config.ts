/* eslint-env node */
import { defineConfig } from "viteburner";
import { resolve } from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"/src": resolve(__dirname, "src"),
			react: resolve(__dirname, "src", "vendored", "react.js"),
			"react-dom": resolve(__dirname, "src", "vendored", "react-dom.js"),
		},
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
			{ pattern: "src/**/*.{script,txt}" },
		],
		sourcemap: "inline",
	},

	plugins: [],

	esbuild: {
		jsx: `transform`,
	},
});
