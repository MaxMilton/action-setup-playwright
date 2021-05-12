[![Build status](https://img.shields.io/github/workflow/status/maxmilton/action-setup-playwright/ci)](https://github.com/maxmilton/action-setup-playwright/actions)
[![Coverage status](https://img.shields.io/codeclimate/coverage/MaxMilton/action-setup-playwright)](https://codeclimate.com/github/MaxMilton/action-setup-playwright)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/maxmilton/action-setup-playwright)](https://github.com/maxmilton/action-setup-playwright/releases)
[![Licence](https://img.shields.io/github/license/maxmilton/action-setup-playwright.svg)](https://github.com/maxmilton/action-setup-playwright/blob/master/LICENSE)

# maxmilton/action-setup-playwright

GitHub action to setup `playwright` in your CI workflows. Installs the system dependencies required to run cross-browser tests on Chromium, WebKit and Firefox with [Playwright](https://github.com/microsoft/playwright).

Originally based on <https://github.com/microsoft/playwright-github-action>.

## Usage

Add a `uses: maxmilton/action-setup-playwright@v1` step to your GitHub workflow definition:

```yml
name: ci
on: push
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1

      - uses: maxmilton/action-setup-playwright@v1
        with:
          browsers: chromium, firefox, webkit # optional
          headless: true # optional

      - run: yarn install --frozen-lockfile
      - run: yarn run build
      - run: yarn run test-e2e
```

### Run in headful mode

This action can also execute tests in headful mode. To do this, set the optional `headless` input to `false`.

```yml
steps:
  - uses: maxmilton/action-setup-playwright@v1
    with:
      headless: false
```

Then use `xvfb-run` on a Linux agent.

```sh
# Windows/macOS
$ yarn run test

# Linux
$ xvfb-run --auto-servernum -- yarn run test
```

### Select browsers

By default system dependencies for all browsers are installed, however, you can limit this to specific browsers only. Set the optional `browsers` input to a comma-separated list of the browsers you intend to launch.

```yml
steps:
  - uses: maxmilton/action-setup-playwright@v1
    with:
      browsers: chromium, firefox, webkit
```

## Bugs

Please report any bugs you encounter on the [GitHub issue tracker](https://github.com/maxmilton/action-setup-playwright/issues).

## Changelog

See [releases on GitHub](https://github.com/maxmilton/action-setup-playwright/releases).

## License

`maxmilton/action-setup-playwright` is an MIT licensed open source project. See [LICENSE](https://github.com/maxmilton/action-setup-playwright/blob/master/LICENSE).

---

© 2021 [Max Milton](https://maxmilton.com)
