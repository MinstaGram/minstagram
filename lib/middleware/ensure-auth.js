const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = UserService.verifyAuthOToken(token);
    next(); 
  } catch(err) {
    err.status = 401;
    next(err);
  }
}