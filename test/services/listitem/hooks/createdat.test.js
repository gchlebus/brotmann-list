'use strict';

const assert = require('assert');
const createdat = require('../../../../src/services/listitem/hooks/createdat.js');

describe('listitem createdat hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    createdat()(mockHook);

    assert.ok(mockHook.createdat);
  });
});
