module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    ["@babel/transform-runtime", {
      corejs: 3,
    }],
    "@babel/plugin-proposal-optional-chaining",
  ],
};
