export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      {
        message: "Expected class name to be camelCase",
      },
    ],

    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "local"],
      },
    ],

    "scss/at-import-partial-extension": null,

    "scss/dollar-variable-pattern": "^[a-z][a-zA-Z0-9]*$",
    "scss/at-mixin-pattern": "^[a-z][a-zA-Z0-9]*$",
  },
};
