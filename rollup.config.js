import resolve from "@rollup/plugin-node-resolve";
import toCommonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./index.tsx",
  output: {
    file: "main.js",
    format: "cjs",
  },
  plugins: [
    babel({ babelHelpers: "bundled", extensions }),
    toCommonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("dev"),
    }),
    resolve({ extensions }),
  ],
  watch: {},
};
