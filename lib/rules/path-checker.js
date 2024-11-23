/**
 * @fileoverview fsd relative paths
 * @author Russell
 */
'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: null, // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'fsd relative paths',
            recommended: false,
            url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        messages: {}, // Add messageId and message
    },

    create(context) {
        return {};
    },
};
