// src: https://github.com/kentcdodds/kentcdodds.com/blob/main/prettier.config.js

process.env.RUNNING_PRETTIER = "true";
module.exports = {
  arrowParens: "avoid",
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  requirePragma: false,
  //   semi: false,
  //   singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};
