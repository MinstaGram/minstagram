const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.session;
    req.user = UserService.verifyAuthOfToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
}