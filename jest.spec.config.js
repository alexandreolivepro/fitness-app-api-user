module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.spec.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/tests/**/*.spec.ts'
	],
	testEnvironment: 'node'
};
