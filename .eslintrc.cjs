module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["jest"],
    "rules": {
        indent: [2, 4, { MemberExpression: 1 }],
        semi: [
            "error",
            "never"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ]
    }
}
