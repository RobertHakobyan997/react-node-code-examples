const getenv = require('getenv');
const path = require('path');
const fs = require('fs');
const { boolean } = require('boolean'); // tslint:disable-line:variable-name

const defaultEnvPath = path.join(__dirname, '.env.defaults');
const envPath = path.join(__dirname, '.env');

const config = require('dotenv-defaults').parse(
  fs.existsSync(envPath) ? fs.readFileSync(envPath) : '',
  fs.existsSync(defaultEnvPath) ? fs.readFileSync(defaultEnvPath) : '',
);

const nodeArgs = [
  '-r',
  'dotenv-defaults/config',
  '-r',
  './ts-hook.js',
  '-r',
  'tsconfig-paths/register',
];

if (boolean(config.DEBUG)) {
  node_args.push(`--inspect=${config.DEBUG_PORT}`);
}

module.exports = {
  name: 'ngpd-merceros-wealth-mdo-dataservice-api',
  namespace: getenv('NAMESPACE'),
  script: 'src/main.ts',
  interpreter: 'node',
  node_args: nodeArgs,
  cwd: __dirname,
  watch: true,
};
