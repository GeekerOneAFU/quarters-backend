import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    uniqueId: user.uniqueId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60s" });
};
