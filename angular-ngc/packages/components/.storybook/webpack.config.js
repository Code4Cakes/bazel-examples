const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['./external/npm/node_modules'] = path.resolve(
    __dirname,
    '../../../node_modules'
  );

  return config;
};
