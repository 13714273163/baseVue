module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ["plugin:vue/recommended", "eslint:recommended"],

    // add your custom rules here
    // it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        "indent": ["error", 4],
        // "off"或 0 -关闭规则
        // "warn" 或 1 - 开启规则, 使用警告 程序不会退出
        // "error"或 2 - 开启规则, 使用错误 程序退出
        "eqeqeq": "off",
        "no-unused-vars": "off", // 定义了未使用
        "no-useless-escape": "off",
        "brace-style": 0,// 大括号风格
        "curly": ["error", "all"], // [2, "all"],//必须使用 if(){} 中的{}
        "no-new": "off",
        "no-return-assign": "warn",// return 语句中不能有赋值表达式
        "handle-callback-err": 0,
        "padded-blocks": 0,
        "no-duplicate-imports": 0,
        "operator-linebreak": 0,
        "no-extend-native": 0,
        "no-sequences": 0,
        "no-debugger": 0,
        "no-eval": 0,
        "comma-dangle": ["error", "never"],
        "arrow-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "no-undef": "error",
        "no-console": 0,
        "space-before-function-paren": ["error", "always"],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "space-before-blocks": ["error", "always"],
        "spaced-comment": ["error", "always", {
            "exceptions": ["-", "+"]
        }],
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
        "no-multiple-empty-lines": ["error", {
            "max": 1
        }],
        "generator-star-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "object-curly-newline": ["error", "always"],
        "linebreak-style": ["error", "windows"],
        "eol-last": ["error", "windows"],
        "object-property-newline": ["error", {
        }],
        "vue/html-indent": [2, 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }]
    }
}

