module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    "plugins": [
        "react",
        "react-hooks",
        "jsx-a11y",
        "@typescript-eslint",
    ],
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    "rules": {
        "eol-last": ["error", "always"],
        "no-trailing-spaces": ["error"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    "overrides": [
        {
            "files": ["*.{ts,tsx}"],
            "extends": ["plugin:@typescript-eslint/recommended"],
            "parser": "@typescript-eslint/parser",
        },
        {
            "files": ["*.types.ts"],
            "rules": {
                "@typescript-eslint/no-namespace": ["off"]
            }
        },
        {
            "files": ["*.test.{ts,tsx}"],
            "rules": {
                "@typescript-eslint/no-non-null-assertion": ["off"],
                "@typescript-eslint/no-explicit-any": ["off"]
            }
        }
    ]
};
