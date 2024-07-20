// import Joi from "joi";

// export const addProductVal = Joi.object({
//   name: Joi.string().min(1).max(50).required().messages({
//     "string.base": `"name" should be a type of 'text'`,
//     "string.empty": `"name" cannot be an empty field`,
//     "string.min": `"name" should have a minimum length of {#limit}`,
//     "any.required": `"name" is a required field`,
//   }),
//   description: Joi.string().min(5).max(2000).required().messages({
//     "string.base": `"description" should be a type of 'text'`,
//     "string.empty": `"description" cannot be an empty field`,
//     "string.min": `"description" should have a minimum length of {#limit}`,
//     "string.max": `"description" should have a maximum length of {#limit}`,
//     "any.required": `"description" is a required field`,
//   }),
//   price: Joi.number().min(0).required().messages({
//     "number.base": `"price" should be a number`,
//     "number.min": `"price" cannot be negative`,
//     "any.required": `"price" is a required field`,
//   }),
//   priceAfterDiscount: Joi.number().min(0).messages({
//     "number.base": `"priceAfterDiscount" should be a number`,
//     "number.min": `"priceAfterDiscount" cannot be negative`,
//   }),
//   quantity: Joi.number().min(0).required().messages({
//     "number.base": `"quantity" should be a number`,
//     "number.min": `"quantity" cannot be negative`,
//     "any.required": `"quantity" is a required field`,
//   }),
//   imageCover: Joi.object({
//     fieldname: Joi.string().required(),
//     originalname: Joi.string().required(),
//     encoding: Joi.string().required(),
//     mimetype: Joi.string()
//       .valid("image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg")
//       .required(),
//     size: Joi.number().max(5242880).required(), // Max size 5MB
//     destination: Joi.string().required(),
//     filename: Joi.string().required(),
//     path: Joi.string().required(),
//   })
//     .required()
//     .messages({
//       "object.base": `"imageCover" should be an object containing file details`,
//       "any.required": `"imageCover" is a required field`,
//     }),
//   images: Joi.array()
//     .items(
//       Joi.object({
//         fieldname: Joi.string().required(),
//         originalname: Joi.string().required(),
//         encoding: Joi.string().required(),
//         mimetype: Joi.string()
//           .valid(
//             "image/jpeg",
//             "image/png",
//             "image/gif",
//             "image/webp",
//             "image/jpg"
//           )
//           .required(),
//         size: Joi.number().max(5242880).required(), // Max size 5MB
//         destination: Joi.string().required(),
//         filename: Joi.string().required(),
//         path: Joi.string().required(),
//       })
//     )
//     .required()
//     .messages({
//       "array.base": `"images" should be an array of objects containing file details`,
//       "array.includesRequiredUnknowns": `"images" must include valid file details`,
//     }),
//   rateAvg: Joi.number().min(0).max(5).messages({
//     "number.base": `"rateAvg" should be a number`,
//     "number.min": `"rateAvg" can't be negative`,
//     "number.max": `"rateAvg" can't be greater than 5`,
//   }),
//   rateCount: Joi.number().messages({
//     "number.base": `"rateCount" should be a number`,
//   }),
// });
