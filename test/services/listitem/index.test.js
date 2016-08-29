'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('listitem service', function() {
  it('registered the listitems service', () => {
    assert.ok(app.service('listitems'));
  });
});
