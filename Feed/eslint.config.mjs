import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly",
                require: "readonly",
                module: "readonly",
                __dirname: "readonly"
            }
        },

        rules: {
            semi: "error",
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    },
]);
