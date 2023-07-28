import { prismaCLient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  // ambil token dari header
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prismaCLient.user.findFirst({ where: { token } });
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
