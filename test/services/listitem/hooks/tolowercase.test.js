'use strict';

const assert = require('assert');
const tolowercase = require('../../../../src/services/listitem/hooks/tolowercase.js');

describe('listitem tolowercase hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    tolowercase()(mockHook);

    assert.ok(mockHook.tolowercase);
  });
});
