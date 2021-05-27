module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@chessAi/(.*)": "<rootDir>/src/$1"
  },
};