module.exports = ({ config }) => {
  config.module.rules.push({
    test: /.*\.(tsx?)$/,
    use: [
      { loader: require.resolve('babel-loader'), options: { cwd: '.storybook' } },
    ],
  });
  config.module.rules.push({
    test: /stories\/.*\.tsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/source-loader'),
      options: { parser: 'typescript' },
    }],
    enforce: 'pre',
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
