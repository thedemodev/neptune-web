- Start Date: 2019-11-07
- RFC PR:
- Issue:

# Summary

Neptune CSS is the future way how we distribute CSS between different technology stacks and applications across TransferWise. In this RFC we propose a way to organise our styles to create these small CSS bundles.

# Basic example

# Motivation

Traditionally we have been using TransferWise Bootstrap, which has grown to be quite big and not so easy to work with. We need to split the existing TransferWise Bootstrap to be consumed in smaller bundles. This was already done to a certain point with the MVP of Neptune CSS. This RFC suggest the way of bundling styles into meaningful bundles for easy use, or into singular component based files if the consumer application wants best optimisation and performance.

# Detailed design

Neptune CSS should be bundled into small and simple to use CSS bundles, that can be imported either fully or in modular way, to create consistent look and feel of TransferWise. At later stage Neptune CSS will migrate from LESS to PostCSS. This is a suggestion how we could split styles in useful way, and build a solid foundation for future CSS development. This RFC doesn't go into details what is inside each CSS file, that would be evaluated separately when doing the transition to this new setup.

## 1. Neptune (full bundle)

This is the bundle that has full Neptune CSS.

### Use Neptune bundle

```
// Full bundle
import '@transferwise/neptune-css/dist/css/neptune.css';
```

## 2. Neptune Core

**Neptune Core** contains the foundation styles, including heading sizes, links styles, font styles, and normalize.css to render elements consistently across browsers.

```
├── neptune-core/
│   ├── global-variables.css
│   ├── normalize.css
│   ├── print.css
│   ├── scaffolding.css
│   ├── typography/
│   │   ├── fonts.css
│   │   ├── typography.css
│   ├── etc.
```

### Use Neptune Core bundle

```js
// Individual
import '@transferwise/neptune-css/dist/css/neptune-core/global-variables.css';
import '@transferwise/neptune-css/dist/css/neptune-core/typography/fonts.css';

// Full bundle
import '@transferwise/neptune-css/dist/css/neptune.core.css';
```

## 3. Neptune Shared Styles

**Neptune Shared Styles** contains styles needed to create grid layouts, buttons or forms. **\*Neptune Shared Styles** are styles that could be part of the **Neptune Core**. This is up to discussion.\*

```
├── neptune-shared-styles/
│   ├── button.css
│   ├── button-groups.css
│   ├── forms.css
│   ├── grid.css
│   ├── input-groups.css
│   ├── responsive-utilities.css
│   ├── scaffolding.css
│   ├── utilities.css
│   ├── etc.
```

### Use Neptune Shared Styles bundle

```js
// Individual
import '@transferwise/neptune-css/dist/css/neptune-shared-styles/button.css';

// Full bundle
import '@transferwise/neptune-css/dist/css/neptune.shared-styles.css';
```

## 4. Neptune Shared Components

**Neptune Shared Components** contains styles that are shared between React, Angular or plain HTML components.

```
├── neptune-shared-components/
│   ├── alert.css
│   ├── circle.css
│   ├── currency-flags.css
│   ├── decision.css
│   ├── dropdowns.css
│   ├── droppable.css
│   ├── icons.css
│   ├── logos.css
│   ├── media.css
│   ├── navs.css
│   ├── navbar.css
│   ├── popovers.css
│   ├── process.css
│   ├── progress-bars.css
│   ├── tables.css
│   ├── tooltip.css
│   ├── etc.
```

### Use Neptune Shared Components bundle

```js
// Individual
import '@transferwise/neptune-css/dist/css/neptune-shared-components/tooltip.css';

// Full bundle
import '@transferwise/neptune-css/dist/css/neptune.shared-components.css';
```

## React Components

Neptune Components written in React will have their individual styles in the component package closer to the implementation. The styles of these React components could possibly be bundled or distributed as individual CSS files for other technology stacks if needed.

## Legacy LESS Components

These are the old legacy LESS components that will be bundled into single CSS bundle. Essentially this is TransferWise Bootstrap + Neptune improvements. Eventually these LESS components can be deprecated.

### Use Neptune Legacy LESS Components bundle

```js
// Individual
import '@transferwise/neptune-css/dist/css/neptune-legace-components/carousel.css';

// Full bundle
import '@transferwise/neptune-css/dist/css/neptune.legacy.css';
```

# Drawbacks

Why should we _not_ do this?

- lot's of unknowns of the current usage of Bootstrap classes, what can be removed and what not
- how to have visibility of all the places these changes will have affect on
- does this really give as more options and freedom than continuing using TransferWise Bootstrap

# Alternatives

Update TransferWise Bootstrap to new version which has better modularity built in, or start using other framework.

# Adoption strategy

Changing the CSS in this magnitude will break some components and layouts. We need to be careful to test this enough with our current applications.

# How we teach this

# Unresolved questions

How to create the bundles from different monorepo packages. How to distribute variables for other applications to use.
