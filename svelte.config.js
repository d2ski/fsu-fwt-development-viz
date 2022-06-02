import adapter from "@sveltejs/adapter-static";
import path from "path";
import svg from "vite-plugin-svgstring";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
		paths: {
			base: dev ? "" : "/fsu-fwt-economic-development",
		},
		vite: {
			resolve: {
				alias: {
					"$styles": path.resolve("./src/styles"),
					"$data": path.resolve("./src/data"),
					"$components": path.resolve("./src/components"),
					"$utils": path.resolve("./src/utils"),
					"$stores": path.resolve("./src/stores"),
					"$actions": path.resolve("./src/actions"),
					"$svg": path.resolve("./src/svg")
				}
			},
			plugins: [svg()],
		}
	}
};

export default config;
