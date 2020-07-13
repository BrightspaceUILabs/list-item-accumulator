# d2l-labs-list-item-accumulator

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/list-item-accumulator.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/list-item-accumulator)
[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUILabs/list-item-accumulator?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/@brightspace-ui-labs/list-item-accumulator.svg?branch=master)](https://travis-ci.com/@brightspace-ui-labs/list-item-accumulator)

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

![alt text](https://github.com/BrightspaceUILabs/list-item-accumulator/raw/master/screenshots/with-illustration.png)

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
    <div slot="supporting-information">Due: 5 days after being assigned</div>
	<d2l-button-icon text="My Button" icon="tier1:search" slot="primary-action"></d2l-button-icon>
    <d2l-menu-item text="View" slot="secondary-action"></d2l-menu-item>
    <d2l-menu-item text="Delete" slot="secondary-action"></d2l-menu-item>
  </d2l-labs-list-item-accumulator>
</d2l-list>
```

This component cannot be used with `d2l-list-item-content`.

### Actions

Only one action may be a present as a button outside of the context menu. Use `slot="primary-action"` for this action.
Secondary actions will be added to the dropdown menu. You may add these to the secondary action slot.

```html
<d2l-menu-item text="Delete" slot="secondary-action"></d2l-menu-item>
```

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

```shell
# run visual-diff tests
npm run test:diff

# subset of visual-diff tests:
npm run test:diff -- -g some-pattern

# update visual-diff goldens
npm run test:diff:golden
```

Golden snapshots in source control must be updated by Travis CI. To trigger an update, press the "Regenerate Goldens" button in the pull request `visual-difference` test run.

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version, create a tag, and trigger a deployment to NPM.
