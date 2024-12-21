/**
 * @fileoverview dec
 * @author Russell
 */
'use strict';

const { isPathRelative } = require('../helpers');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'check public api imports',
            recommended: false,
            url: null,
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                },
            },
        ],
        messages: {
            Error: 'Абсолютный импорт разрешен только из Public API',
        },
    },

    create(context) {
        const alias = context.options[0]?.alias || '@';

        const availableLayers = {
            entities: 'entities',
            features: 'features',
            pages: 'pages',
            widgets: 'widgets',
        };

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const source = alias ? value.replace(`${alias}/`, '') : value;

                if (isPathRelative(source)) {
                    return;
                }

                const segments = source.split('/');

                if (!availableLayers[segments[0]]) {
                    return;
                }

                const isImportNotFromPublicApi = segments.length > 2;

                if (isImportNotFromPublicApi) {
                    context.report({
                        node,
                        messageId: 'Error',
                    });
                }
            },
        };
    },
};
