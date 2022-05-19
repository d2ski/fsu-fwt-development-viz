import adapter from '@sveltejs/adapter-auto';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: "",
		},
		vite: {
			resolve: {
				alias: {
					"$styles": path.resolve("./src/styles"),
					"$data": path.resolve("./src/data"),
					"$components": path.resolve("./src/components"),
					"$utils": path.resolve("./src/utils"),
				}
			}
		}
	}
};

export default config;
