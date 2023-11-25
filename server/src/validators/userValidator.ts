import Joi from "joi";

export const validateLoginUser = Joi.object().keys({
  email: Joi.string()
    .email()
    .custom((value, helpers) => {
      if (!value.match(/^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/)) {
        return helpers.error("string.pattern.custom", {
          regex: /^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/,
        });
      }
      return value;
    })
    .required(),
  password: Joi.string().required(),
});

export const validateuserId = Joi.object().keys({
  club_id: Joi.string().min(8).required(),
});

export const validateRegisterUser = Joi.object().keys({
  user_name: Joi.string().required(),
  cohort_number: Joi.number().required().max(25).min(1),
  email: Joi.string()
    .email()
    .custom((value, helpers) => {
      if (!value.match(/^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/)) {
        return helpers.error("string.pattern.custom", {
          regex: /^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/,
        });
      }
      return value;
    })
    .required(),
  password: Joi.string().pattern(
    new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
    )
  ),
});

export const validateUserEmail = Joi.object().keys({
  email: Joi.string()
    .email()
    .custom((value, helpers) => {
      if (!value.match(/^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/)) {
        return helpers.error("string.pattern.custom", {
          regex: /^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/,
        });
      }
      return value;
    })
    .required(),
});

export const validateUpdateuser = Joi.object().keys({
  user_name: Joi.string().required(),
  cohort_number: Joi.number().required().max(25).min(1),
  email: Joi.string()
    .email()
    .custom((value, helpers) => {
      if (!value.match(/^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/)) {
        return helpers.error("string.pattern.custom", {
          regex: /^[a-zA-Z]+\.[a-zA-Z]+@thejitu\.com$/,
        });
      }
      return value;
    })
    .required(),
  club_id: Joi.string().min(8).required(),
});
