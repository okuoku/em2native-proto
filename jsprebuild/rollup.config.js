import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

const config_duktape = {
    input: "../runtime/index.js",
    output: {
        dir: "output-duk",
        format: "iife",
        name: "loader",
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: "bundled", configFile: false,
              presets: [ "@babel/preset-env"]
        })
    ],
    external: ["./port-std.mjs", "./port-native.mjs"]
};

export default config_duktape;
