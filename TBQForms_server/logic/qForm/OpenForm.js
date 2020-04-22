'use strict';

const IForm = require('./IForm');

module.exports = class OpenForm extends IForm {
  constructor(qForm) {
    super(qForm);
  }

  checkAccess(email) {
    return true;
  }
};
