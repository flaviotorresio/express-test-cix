import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } }, "rules": {
      "jsdoc/no-undefined-types": 1
    },
    "plugins": [
      "jsdoc"
    ]
  },
  pluginJs.configs.recommended,
];