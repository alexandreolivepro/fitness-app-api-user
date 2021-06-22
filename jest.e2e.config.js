module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.e2e.json'
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
		'**/tests/**/*.e2e.ts'
	],
	testEnvironment: 'node'
};
