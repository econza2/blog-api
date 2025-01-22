function verifyAccessBearer(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader !== "undefined") {
    const seperatedToken = authorizationHeader.split(" ");
    const extractedToken = seperatedToken[1];
    req.token = extractedToken;

    next();
  } else {
    res.status(403).send("It is forbiden for you to view this resource");
  }
}

module.exports = verifyAccessBearer;
