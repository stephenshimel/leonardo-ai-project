module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Use babel-jest for TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: "jsdom", // Ensure jsdom is used
};
