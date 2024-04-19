import jwt from "jsonwebtoken";

export const generateJwtToken = (username) => {
  return jwt.sign({ username }, "secret", { expiresIn: "24h" });
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, "secret", (err, decoded) => {
    if (err) return false;
    else return true;
  });
};
