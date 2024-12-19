/**
 * @fileoverview fsd relative paths
 * @author Russell
 */
'use strict';

const path = require('path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem', // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'fsd relative paths',
            recommended: false,
            url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                },
            },
        ], // Add a schema if the rule has options
        messages: {
            Error: 'В рамках одного слоя пути должны быть относительными',
        }, // Add messageId and message
    },

    create(context) {
        const alias = context.options[0]?.alias || '@';

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const source = alias ? value.replace(`${alias}/`, '') : value;

                const fromFilename = context.filename;

                if (shouldBeRelative(fromFilename, source)) {
                    context.report({
                        node,
                        messageId: 'Error',
                    });
                }
            },
        };
    },
};

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}

const layers = {
    entities: 'entities',
    features: 'features',
    pages: 'pages',
    widgets: 'widgets',
    shared: 'shared',
};

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }

    const toArray = to.split('/'); // [ '', 'entities', 'Article' ]
    const toLayer = toArray[1]; // entities
    const toSlice = toArray[2]; // Article

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    const fromNormalizedPath = path.toNamespacedPath(from);
    const isWindowsOS = fromNormalizedPath.includes('\\');
    const fromPath = fromNormalizedPath?.split('src')[1];
    const fromArray = fromPath?.split(isWindowsOS ? '\\' : '/'); // [ '', 'entities', 'Article' ]
    const fromLayer = fromArray[1]; // entities
    const fromSlice = fromArray[2]; // Article

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    return fromLayer === toLayer && fromSlice === toSlice;
}
