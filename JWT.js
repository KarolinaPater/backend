const config = require("./config");

const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: "6h" }
  );
  return accessToken;
};
const validateToken = (req, res, next) => {
  console.log("waliduje tokena");
  const accessToken = req.headers["x-access-token"];

  if (!accessToken) {
    console.log("niematokena");
    return res
      .status(400)
      .json({ error: "Uzytkownik nie posiada autoryzacji" });
  }
  try {
    const validToken = verify(accessToken, config.JWT_SECRET);
    if (validToken) {
      console.log("tokenok");
      return next();
    }
  } catch (err) {
    console.log("jakis error");
    return res
      .status(400)
      .json({ error: "Uzytkownik nie posiada autoryzacji" });
  }
};
module.exports = { createTokens, validateToken };
