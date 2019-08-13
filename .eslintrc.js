module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'plugin:vue/essential',
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard'
	],
	plugins: [
		'vue'
	],
	rules: {
		// 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': 'off',
		'no-debugger': 'off',
		'eol-last': 0,
		'quotes': [1, 'single'],
		'no-tabs': 0,
		'indent': ['off', 'tab'],
		'space-before-function-paren': 0,
		// 'no-self-assign': 0,
		// 'no-useless-escape': 0,
		// 'no-var': 0,
		// 'space-in-parens': 0,
		// 'valid-typeof': 0,
		// 'eqeqeq': 0,
		// 'no-trailing-spaces': 0,
		// 'spaced-comment': 0,
		// 'no-unneeded-ternary': 0,
		// 'func-call-spacing': 0,
		// 'object-curly-spacing': 0,
		// 'no-use-before-define': 0,
		// 'camelcase': 0,
		// 'semi': 0, //封号符
		// 'no-cond-assign': 0,
		// 'padded-blocks': 0,
		// 'no-unused-expressions': 0,
		// 'operator-linebreak': 0
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
