const jwt = require("jsonwebtoken");

const secureMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized: Invalid token",
          });
        }

        req.user = decoded;

        next();
      }
    );

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = secureMiddleWare;