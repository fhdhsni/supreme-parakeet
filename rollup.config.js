import resolve from "@rollup/plugin-node-resolve";
import commonJS_to_ES6 from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./dev/index.tsx",
  output: {
    dir: "dev/dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    commonJS_to_ES6(),
    typescript({
      jsx: "react-jsxdev", // "jsx": "react-jsx",
      outDir: "./dev/dist",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("dev"),
    }),
  ],
  watch: {},
};
