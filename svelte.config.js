import adapter from '@sveltejs/adapter-auto';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					"$styles": path.resolve("./src/styles"),
					"$data": path.resolve("./src/data"),
					"$components": path.resolve("./src/components"),
				}
			}
		}
	}
};

export default config;
