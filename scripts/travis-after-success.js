const path = require('path');
const spawn = require('cross-spawn'); // eslint-disable-line

function getConcurrentlyArgs(scripts, { killOthers = true } = {}) {
  const colors = [
    'bgBlue',
    'bgGreen',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
    'bgRed',
    'bgBlack',
    'bgYellow',
  ];

  // eslint-disable-next-line
  scripts = Object.entries(scripts).reduce((all, [name, script]) => {
    if (script) {
      return Object.assign({}, all, { [name]: script });
    }
    return all;
  }, {});

  const prefixColors = Object.keys(scripts)
    .reduce(
      (pColors, _s, i) =>
        pColors.concat([`${colors[i % colors.length]}.bold.reset`]),
      [],
    )
    .join(',');

  // prettier-ignore
  return [
    killOthers ? '--kill-others-on-fail' : null,
    '--prefix', '[{name}]',
    '--names', Object.keys(scripts).join(','),
    '--prefix-colors', prefixColors,
    ...Object.values(scripts).map(s => JSON.stringify(s)), // stringify escapes quotes ✨
  ].filter(Boolean)
}

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
  const result = spawn.sync(
    path.join(__dirname, '..', 'node_modules/.bin', 'concurrently'),
    getConcurrentlyArgs(
      {
        release: autorelease
          ? `echo installing semantic-release && npx -p semantic-release@8 -c 'echo running semantic-release && semantic-release pre && semantic-release post'`
          : null,
      },
      { killOthers: false },
    ),
    { stdio: 'inherit' },
  );

  process.exit(result.status);
}
