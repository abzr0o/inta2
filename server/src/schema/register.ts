import Joi from "joi"

const registerSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
    .messages({
      "string.pattern.base":
        "password should be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
      "any.only": "passwords are not equil",
    }),
  confirmPassword: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "enter vaild email",
    }),
})

export default registerSchema
