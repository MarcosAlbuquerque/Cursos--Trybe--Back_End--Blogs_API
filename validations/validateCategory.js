const sendStatusError = require('./sendStatusError');
const { MESSAGE_ERROR12, MESSAGE_ERROR15 } = require('./messageError');

  function checkName(res, name) {
    if (name === undefined) sendStatusError(400, MESSAGE_ERROR12, res);
  }

  function checkCategory(res, category) {
    if (Array.isArray(category)) sendStatusError(400, MESSAGE_ERROR15, res);
    // if (typeof (category) === 'undefined') sendStatusError(400, MESSAGE_ERROR15, res);
  }
  
  function validateRegistration(req, res, next) {
    const { name, categoryIds } = req.body;

    checkName(res, name);
    checkCategory(res, categoryIds);

    next();
  }
  
  module.exports = validateRegistration;