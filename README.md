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

![Example of draggable item](/screenshots/draggable-dragging.png)

## Installation

Install from NPM:

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

## Developing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Testing

To run the full suite of tests:

```shell
npm test
```

Alternatively, tests can be selectively run:

```shell
# eslint
npm run lint:eslint

# stylelint
npm run lint:style

# unit tests
npm run test:unit
```

This repo uses [@brightspace-ui/testing](https://github.com/BrightspaceUI/testing)'s vdiff command to perform visual regression testing:

```shell
# vdiff
npm run test:vdiff

# re-generate goldens
npm run test:vdiff golden
```

### Running the demos

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

```shell
npm start
```

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
