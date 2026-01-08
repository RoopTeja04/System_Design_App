import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs"
    },
    rules: {
      semi: "error",
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  },
]);
