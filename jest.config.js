module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Use babel-jest for TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  silent: true,
  testEnvironment: "jsdom", // Ensure jsdom is used
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
