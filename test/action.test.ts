// TODO: Write more unit tests!!

import * as assert from 'uvu/assert';
import { DEPENDENCIES, getInputList, getDependencies } from '../src/action';
import { describe } from './utils';

const allOSs = ['ubuntu18.04', 'ubuntu20.04'] as const;
const allBrowsers = ['chromium', 'firefox', 'webkit'];

describe('dependencies const', (test) => {
  test('is an object with entries', () => {
    assert.type(DEPENDENCIES, 'object');
    assert.is(Object.keys(DEPENDENCIES).length > 0, true, 'has OS entries');
  });

  test('contains a list of dependencies for each browser', () => {
    Object.values(DEPENDENCIES).forEach((values) => {
      assert.is(Array.isArray(values.chromium), true, 'has chromium deps array');
      assert.is(Array.isArray(values.firefox), true, 'has firefox deps array');
      assert.is(Array.isArray(values.webkit), true, 'has webkit deps array');
      assert.is(values.chromium.length > 0, true, 'chromium deps array has items');
      assert.is(values.firefox.length > 0, true, 'firefox deps array has items');
      assert.is(values.webkit.length > 0, true, 'webkit deps array has items');
    });
  });
});

describe('getInputList fn', (test) => {
  test('is a function', () => {
    assert.type(getInputList, 'function');
  });

  // TODO: Mock `@actions/core` functions we use; getInput, setFailed
  // test('returns an array of strings', () => {
  //   const value = 'a, b, c';
  //   const result = getInputList(/* FIXME */);
  //   assert.is(Array.isArray(result), true);
  //   assert.is(result.length, 3);
  //   assert.equal(result, ['a', 'b', 'c']);
  // });
});

describe('getDependencies fn', (test) => {
  test('is a function', () => {
    assert.type(getDependencies, 'function');
  });

  test('throws on unknown OS', () => {
    // @ts-expect-error - intentional incorrect string
    assert.throws(() => getDependencies('fake', ['chromium']));
  });

  test('throws on unknown browser', () => {
    assert.throws(() => getDependencies(allOSs[0], ['fake']));
  });

  allOSs.forEach((osName) => {
    test(`returns an array of strings for "${osName}" OS`, () => {
      const result = getDependencies(osName, allBrowsers);
      assert.is(Array.isArray(result), true, 'is array');
      assert.is(result.length > 0, true, 'has items');
      assert.is(
        result.every((x) => !!x && typeof x === 'string'),
        true,
        'all deps are non-empty strings',
      );
    });
  });
});
