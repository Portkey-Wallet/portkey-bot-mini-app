const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const { NEXT_PUBLIC_APP_ENV } = process.env;
const pluginConfig = require('./build.config/plugin');
const development = require('./build.config/development');
const production = require('./build.config/production');

const config = NEXT_PUBLIC_APP_ENV === 'production' ? production : development;
console.log('load next.config.mjs');

module.exports = withPlugins(pluginConfig, config);
