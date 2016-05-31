module.exports = function ensureRole(role) {
  return function (req, res, next) {
    if (req.user.roles.indexOf(role) > -1) {
      next();
    } else {
      res.status(401).json({
        msg: 'Not Authorized'
      });
    }
  };
};
