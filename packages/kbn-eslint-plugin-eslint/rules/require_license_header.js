/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const babelEslint = require('babel-eslint');

const { assert, normalizeWhitespace, init } = require('../lib');

function isHashbang(text) {
  return text.trim().startsWith('#!') && !text.trim().includes('\n');
}

module.exports = {
  meta: {
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          // SonarK: better license verification.
          licenses: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: context => {
    return {
      Program(program) {
        const licenses = init(context, program, function() {
          // SonarK: better license verification.
          const options = context.options[0] || {};
          const licenses = options.licenses; // SonarK: better license verification.

          assert(!!licenses, '"licenses" option is required'); // SonarK: better license verification.

          // SonarK: better license verification.
          return licenses.map(license => {
            const parsed = babelEslint.parse(license);
            assert(!parsed.body.length, '"license" option must only include a single comment');
            assert(
              parsed.comments.length === 1,
              '"license" option must only include a single comment'
            );

            return {
              source: license,
              nodeValue: normalizeWhitespace(parsed.comments[0].value),
            };
          });
        });

        // SonarK: better license verification.
        if (!licenses || !licenses.length) return;

        // SonarK: better license verification.
        const license = licenses.length > 1 ? licenses[licenses.length - 1] : licenses[0];

        const sourceCode = context.getSourceCode();
        const comment = sourceCode
          .getAllComments()
          // SonarK: better license verification.
          .find(node =>
            licenses.find(license => normalizeWhitespace(node.value) === license.nodeValue)
          );

        // no licence comment
        if (!comment) {
          context.report({
            message: 'File must start with a license header',
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: sourceCode.lines[0].length - 1 },
            },
            fix(fixer) {
              if (isHashbang(sourceCode.lines[0])) {
                return undefined;
              }

              return fixer.replaceTextRange([0, 0], license.source + '\n\n');
            },
          });
          return;
        }

        // ensure there is nothing before the comment
        const sourceBeforeNode = sourceCode
          .getText()
          .slice(0, sourceCode.getIndexFromLoc(comment.loc.start));
        if (sourceBeforeNode.length && !isHashbang(sourceBeforeNode)) {
          context.report({
            node: comment,
            message: 'License header must be at the very beginning of the file',
            fix(fixer) {
              // replace leading whitespace if possible
              if (sourceBeforeNode.trim() === '') {
                return fixer.replaceTextRange([0, sourceBeforeNode.length], '');
              }

              // inject content at top and remove node from current location
              // if removing whitespace is not possible
              return [
                fixer.remove(comment),
                fixer.replaceTextRange([0, 0], license.source + '\n\n'),
              ];
            },
          });
        }
      },
    };
  },
};
