'use strict';

const IForm = require('./IForm');

module.exports = class LimitedForm extends IForm {
  constructor(formId) {
    super(formId);
  }

  checkAccess(email) {
    const access = [...this.allowedUsers, this.email]
        .reduce((acc, allowedUser) => {
          return acc || allowedUser === email;
        }, false);
    return access;
  }
};
