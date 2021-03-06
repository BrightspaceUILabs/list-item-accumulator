# d2l-labs-list-item-accumulator

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/list-item-accumulator.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/list-item-accumulator)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [ ] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [x] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [ ] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [ ] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [ ] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [x] README documentation

The `d2l-labs-list-item-accumulator` element for use with `d2l-list` introduces a card-based item to help users organize in a tactile fashion.

![Example of draggable item](https://raw.githubusercontent.com/BrightspaceUILabs/list-item-accumulator/zina/add-drag/screenshots/draggable-dragging.png)

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/list-item-accumulator
```

## Usage

```html
<script type="module">
    import '@brightspace-ui/core/components/list/list.js';
    import '@brightspace-ui-labs/list-item-accumulator/list-item-accumulator.js';
</script>

<d2l-list>
  <d2l-labs-list-item-accumulator>
    <img slot="illustration" src="https://s.brightspace.com/course-images/images/e5fd575a-bc14-4a80-89e1-46f349a76178/tile-high-density-max-size.jpg">
    Employee Orientation
    <div slot="secondary">Course &middot; 33 mins</div>
    <div slot="supporting-info">Due: 5 days</div>

    <d2l-button-icon text="Search" icon="tier1:search" slot="primary-action"></d2l-button-icon>
    <d2l-menu-item text="View" slot="secondary-action"></d2l-menu-item>
    <d2l-menu-item text="Delete" slot="secondary-action"></d2l-menu-item>
  </d2l-labs-list-item-accumulator>
</d2l-list>
```

This component cannot be used with `d2l-list-item-content`.

### Actions

Only **one** action may be a present as a button outside of the context menu. Use `slot="primary-action"` for this action.

```html
    <d2l-button-icon text="Search" icon="tier1:search" slot="primary-action"></d2l-button-icon>
```

Secondary actions will be added to the dropdown menu. You may add these to the secondary action slot.

```html
<d2l-menu-item text="Delete" slot="secondary-action"></d2l-menu-item>
<d2l-menu-item text="View" slot="secondary-action"></d2l-menu-item>
```

#### Mobile Primary Action

The `primary-action` will be added to the dropdown menu for mobile devices. Clicking on this `menu-item` will trigger a `click` on the primary action.

**Properties:**

| Property | Type | Description |
|--|--|--|
| `draggable` | `Boolean` | Whether or not the item is draggable |

**Accessibility:**

To make your usage of `d2l-labs-list-item-accumulator` accessible, use the following properties when applicable:

| Attribute | Description |
|--|--|
| | |

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit
```

### Testing

```shell
# lint, unit test and visual-diff test
npm test

# lint only
npm run lint

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
# then navigate to `http://localhost:9876/debug.html`
npm run test:headless:watch
```

### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

The golden snapshots in source control must be updated by Github Actions.  If your PR's code changes result in visual differences, a PR with the new goldens will be automatically opened for you against your branch.

If you'd like to run the tests locally to help troubleshoot or develop new tests, you can use these commands:

```shell
# Install dependencies locally
npm i mocha -g
npm i @brightspace-ui/visual-diff puppeteer --no-save
# run visual-diff tests
mocha './test/**/*.visual-diff.js' -t 10000
# subset of visual-diff tests:
mocha './test/**/*.visual-diff.js' -t 10000 -g some-pattern
# update visual-diff goldens
mocha './test/**/*.visual-diff.js' -t 10000 --golden
```

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
