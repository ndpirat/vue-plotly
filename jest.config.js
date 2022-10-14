module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^plotly.js$': '<rootDir>/tests/mocks/plotly.js',
    '^plotly.js/dist/plotly-gWAP.min.js$': '<rootDir>/tests/mocks/plotly.js'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.*'],
  testURL: 'http://localhost/',
  setupFiles: ['jest-canvas-mock', '<rootDir>/tests/helpers/mockUrl.js']
}
