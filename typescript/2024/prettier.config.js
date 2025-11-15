/** @type {import('prettier').Config} */
export default {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  importOrder: [
    "^(node:.*)$",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};
