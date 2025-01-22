const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SIGN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({
        message: "Forbidden",
      });
    } else {
      next();
    }
  });
}

module.exports = verifyAccessToken;
