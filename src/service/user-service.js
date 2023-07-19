import { v4 as uuid } from "uuid";
import { prismaCLient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
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

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaCLient.user.findUnique({
    where: { username: loginRequest.username },
    select: { username: true, password: true },
  });
  if (!user) {
    throw new ResponseError(403, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(403, "Username or password wrong");
  }

  const token = uuid().toString();

  return prismaCLient.user.update({
    data: {
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

export default {
  register,
  login,
};
