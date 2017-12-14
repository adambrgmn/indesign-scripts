const spawn = require('cross-spawn'); // eslint-disable-line

function envIsSet(name) {
  return (
    process.env.hasOwnProperty(name) && // eslint-disable-line
    process.env[name] &&
    process.env[name] !== 'undefined'
  );
}

function parseEnv(name, def) {
  if (envIsSet(name)) {
    return JSON.parse(process.env[name]);
  }
  return def;
}

const autorelease =
  parseEnv('TRAVIS', false) &&
  process.env.TRAVIS_BRANCH === 'master' &&
  !parseEnv('TRAVIS_PULL_REQUEST', false);

if (!autorelease) {
  // eslint-disable-next-line
  console.log(
    'No need to autorelease or report coverage. Skipping travis-after-success script...',
  );
} else {
  const result = spawn.sync('yarn', ['run', 'semantic-release']);
  process.exit(result.status);
}
