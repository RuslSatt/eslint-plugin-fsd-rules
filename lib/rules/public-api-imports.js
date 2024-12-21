/**
 * @fileoverview dec
 * @author Russell
 */
'use strict';

const { isPathRelative } = require('../helpers');
const micromatch = require('micromatch');

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
                    testFilePatterns: {
                        type: 'array',
                    },
                },
            },
        ],
        messages: {
            Error: 'Абсолютный импорт разрешен только из Public API',
            TestingError: 'Тестовый импорт разрешен только из Public API testing.ts',
        },
    },

    create(context) {
        const { alias = '@', testFilePatterns = [] } = context.options[0] ?? {};

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
                const isTestingPublicApi = segments[2] === 'testing';

                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({
                        node,
                        messageId: 'Error',
                    });
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.filename;

                    const isCurrentFileTesting = testFilePatterns.some((pattern) => micromatch.isMatch(currentFilePath, pattern));

                    if (!isCurrentFileTesting) {
                        context.report({
                            node,
                            messageId: 'TestingError',
                        });
                    }
                }
            },
        };
    },
};
