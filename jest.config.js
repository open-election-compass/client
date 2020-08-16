module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/*.config.js',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
};
