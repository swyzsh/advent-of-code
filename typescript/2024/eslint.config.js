// @ts-nocheck
import stylisticPlugin from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import nodePlugin from "eslint-plugin-n";
import onlyWarn from "eslint-plugin-only-warn";
import pnpmPlugin from "eslint-plugin-pnpm";
import globals from "globals";
import jsoncParser from "jsonc-eslint-parser";
import tseslint from "typescript-eslint";
import yamlParser from "yaml-eslint-parser";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  eslintConfigPrettier,

  {
    name: "ignores",
    ignores: ["**/dist/**"],
  },

  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2022,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": tseslint.plugin,
      // @ts-expect-error
      import: importPlugin,
      node: nodePlugin,
      onlyWarn,
    },
    rules: {
      // Javascript Rules
      "for-direction": "error",
      "no-async-promise-executor": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-constant-binary-expression": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-empty-static-block": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": "error",
      "no-global-assign": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-octal": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      /** Warn about variable with identical names in the outer scope */
      "no-shadow": "warn",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      /** Allow the use of undeclared variables */
      "no-undef": "off",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "no-useless-backreference": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      /** Prefer let and const */
      "no-var": "error",
      "no-with": "error",
      /** Prefer const if never re-assigned */
      "prefer-const": "error",
      "require-yield": "error",
      /** Enforce comparing typeof against valid strings */
      "valid-typeof": "error",

      // TypeScript Rules
      /** Prefer Array<T> format */
      "@typescript-eslint/array-type": [
        "error",
        { default: "generic", readonly: "generic" },
      ],
      /** Prevent @ts-ignore, allow @ts-expect-error */
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": false,
          "ts-ignore": "allow-with-description",
        },
      ],
      /** Enforce import type { T } */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      /** Shorthand method style is less strict */
      "@typescript-eslint/method-signature-style": ["error", "property"],
      /** Enforces generic type convention. */
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeParameter",
          format: ["PascalCase"],
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid",
          custom: {
            regex: "^(T|T[A-Z][A-Za-z]+)$",
            match: true,
          },
        },
      ],
      /** Duplicate values can lead to bugs that are hard to track down */
      "@typescript-eslint/no-duplicate-enum-values": "error",
      /** Using the operator any more than once does nothing */
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      /** There are several potential bugs with this compared to other loops */
      "@typescript-eslint/no-for-in-array": "error",
      /** Enforce valid definition of new and constructor */
      "@typescript-eslint/no-misused-new": "error",
      /** Disallow TypeScript namespaces */
      "@typescript-eslint/no-namespace": "error",
      /** Disallow non-null assertions after an optional chain expression */
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      /** Allow the use of undeclared variables */
      "@typescript-eslint/no-undef": "off",
      /** Detects conditionals which will always evaluate truthy or falsy */
      "@typescript-eslint/no-unnecessary-condition": "error",
      /** Checks if the the explicit type is identical to the inferred type */
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      /** Disallow using the unsafe built-in Function type */
      "@typescript-eslint/no-unsafe-function-type": "error",
      /** Allow unused variables if appended by an underscore (_) */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrorsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      /** Disallow using confusing built-in primitive class wrappers */
      "@typescript-eslint/no-wrapper-object-types": "error",
      /** Enforce the use of as const over literal type */
      "@typescript-eslint/prefer-as-const": "error",
      /** Warn about async functions which have no await expression */
      "@typescript-eslint/require-await": "warn",
      /** Prefer of ES6-style import declarations */
      "@typescript-eslint/triple-slash-reference": "error",
    },
  },

  {
    name: "package-json",
    files: ["package.json", "**/package.json"],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      pnpm: pnpmPlugin,
    },
    rules: {
      "pnpm/json-enforce-catalog": "error",
      "pnpm/json-valid-catalog": "error",
      "pnpm/json-prefer-workspace-settings": "error",
    },
  },

  {
    name: "pnpm-workspace",
    files: ["pnpm-workspace.yaml"],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      pnpm: pnpmPlugin,
    },
    rules: {
      "pnpm/yaml-no-unused-catalog-item": "error",
      "pnpm/yaml-no-duplicate-catalog-item": "error",
    },
  },
];
