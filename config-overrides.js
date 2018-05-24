const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
function overrideEslintOptions(options) {
  return options
}
module.exports = function override(config, env) {
  config.resolve.alias = {
    '@': resolve('src')
  }
  config = rewireEslint(config, env, overrideEslintOptions)
  return config
}

