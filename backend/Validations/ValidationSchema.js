const Joi = require('joi')// Joi validation schema for register
 const registerSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
      "string.min": "Username must be at least 3 characters.",
      "any.required": "Username is required."
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required."
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters.",
      "any.required": "Password is required."
    }),
    role: Joi.string().valid("user", "admin").required().messages({
      "any.only": "Role must be 'user' or 'admin'.",
      "any.required": "Role is required."
    }),
  });
  
  // Joi validation schema for login
   const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required."
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required."
    }),
  });
  
  module.exports = { registerSchema, loginSchema };