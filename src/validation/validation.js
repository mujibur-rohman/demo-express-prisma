import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false, // untuk memvalidasi semuanya
    allowUnknown: false, // untuk tidak menyetujui adanya body yang diluar validasi
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
