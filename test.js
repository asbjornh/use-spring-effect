const test = require('ava');

const packageJson = require('./package.json');

test('Default export', t => {
  t.notThrows(() => {
    require('./' + packageJson.main).default;
  });
});

test('Named exports', t => {
  const e = require('./' + packageJson.main);

  t.is('function', typeof e.useSpringEffect);
  t.is('function', typeof e.useSpringStyle);
  t.is('function', typeof e.useMultiSpringEffect);
  t.is('function', typeof e.useSpring);
});
