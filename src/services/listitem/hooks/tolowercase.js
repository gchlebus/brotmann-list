'use strict';

// src/services/listitem/hooks/tolowercase.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.tolowercase = true;
    hook.data.text = hook.data.text.toLowerCase();
  };
};
