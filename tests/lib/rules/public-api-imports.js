/**
 * @fileoverview dec
 * @author Russell
 */
'use strict';

const rule = require('../../../lib/rules/public-api-imports'),
    RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('public-api-imports-by-russell', rule, {
    valid: [],

    invalid: [
        {
            code: '',
            errors: [{ messageId: 'Fill me in.', type: 'Me too' }],
        },
    ],
});
