module.exports = {
  roots: [
    '<rootDir>/src',
  ],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  testRegex: '(/__test__/.*|(\\.|/)(test|spec)\\.js$)',

  moduleFileExtensions: [
    'js',
    'json',
    'node',
  ],

  moduleNameMapper: {},
}
