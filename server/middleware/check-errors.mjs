import { validationResult } from "express-validator";

const CheckErrors = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(error.mapped());
  }

  next();
};
export default CheckErrors;
