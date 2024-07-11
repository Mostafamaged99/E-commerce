import slugify from "slugify";
import { Category } from "../../../database/models/category.model.js";
import { messages } from "../../utlities/messages.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utlities/appError.js";

const addCategory = catchError(async (req, res) => {
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // get data from req.body
  const category = new Category(req.body);
  // save data
  await category.save();
  // send response
  res.json({ message: messages.category.addedSuccessfully, data: category });
});

const allcategories = catchError(async (req, res, next) => {
  // get data from req.body
  const categories = await Category.find().populate("createdBy");
  // send response
  if (!categories.length) {
    return next(new AppError(messages.category.notFound, 404));
  }
  return res.json({ message: messages.category.successGet, data: categories });
});

const getCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const category = await Category.findById(req.params.id).populate("createdBy");
  // send response
  category || next(new AppError(messages.category.notFound, 404));
  !category ||
    res.json({ message: messages.category.successGet, data: category });
});

const updateCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // send response
  category || next(new AppError(messages.category.notFound, 404));
  !category ||
    res.json({
      message: messages.category.updatedSuccessfully,
      data: category,
    });
});

const deleteCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const category = await Category.findByIdAndDelete(req.params.id);
  // send response
  category || next(new AppError(messages.category.notFound, 404));
  !category ||
    res.json({
      message: messages.category.deletedSuccessfully,
      data: category,
    });
});

export {
  addCategory,
  allcategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
