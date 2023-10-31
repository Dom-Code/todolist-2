import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ObjectSchema } from 'joi';

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if (Object.keys(req.body).length === 0) {
      //   return res.status(400).json({ message: 'Nothing was recieved' });
      // }
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: 'Could not validate' });
    }
  };
};

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      )
    )
    .required(),
});

export const RegisterSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  name: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      )
    )
    .required(),
  // repeat_password: Joi.ref('password')
});
