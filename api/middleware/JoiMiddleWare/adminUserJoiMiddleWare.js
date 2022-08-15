import Joi from "joi";

export const addAdminToDatabase = (req, res, next) => {
  // give rules to the joi schema
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),

    lastName: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().alphanum().min(3).max(30).required(),
    emailCode: Joi.string(),
  });
  //   give data to the joi
  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

export const emailVerificationValidation = (req, res, next) => {
  // give rules to the joi schema
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    emailCode: Joi.string().min(3).max(300),
  });
  //   give data to the joi
  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};
