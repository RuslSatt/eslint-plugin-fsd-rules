# eslint-plugin-fsd-rules

plugin for fsd rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-rules`:

```sh
npm install eslint-plugin-fsd-rules --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-fsd-rules` and add `fsd-rules` to the `plugins` key:

```js
import fsd-rules from "eslint-plugin-fsd-rules";

export default [
    {
        plugins: {
            fsd-rules
        }
    }
];
```

Then configure the rules you want to use under the `rules` key.

```js
import fsd-rules from "eslint-plugin-fsd-rules";

export default [
    {
        plugins: {
            fsd-rules
        },
        rules: {
            "fsd-rules/rule-name": "warn"
        }
    }
];
```

## Configurations

<!-- begin auto-generated configs list -->

TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
