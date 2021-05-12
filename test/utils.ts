/* eslint-disable import/prefer-default-export */

import { suite } from 'uvu';

export function describe(
  name: string,
  fn: (test: ReturnType<typeof suite>) => void,
): void {
  const testSuite = suite(name);
  fn(testSuite);
  testSuite.run();
}
