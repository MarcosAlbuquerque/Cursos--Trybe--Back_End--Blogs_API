const sendStatusError = require('./sendStatusError');
const { MESSAGE_ERROR13, MESSAGE_ERROR15, MESSAGE_ERROR14 } = require('./messageError');

function validatePost(req, res, next) {
  const { title, content, categoryIds } = req.body;

  if (title === undefined) sendStatusError(400, MESSAGE_ERROR13, res);  
  if (content === undefined) sendStatusError(400, MESSAGE_ERROR14, res);  
  if (categoryIds === undefined) sendStatusError(400, MESSAGE_ERROR15, res);

  next();
}

module.exports = validatePost;