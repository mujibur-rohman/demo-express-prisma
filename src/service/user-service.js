import { prismaCLient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaCLient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(200, "User already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaCLient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

export default {
  register,
};
