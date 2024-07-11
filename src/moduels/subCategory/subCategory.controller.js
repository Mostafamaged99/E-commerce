import slugify from "slugify";
import { messages } from "../../utlities/messages.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utlities/appError.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";

const addSubCategory = catchError(async (req, res) => {
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // get data from req.body
  const subCategory = new SubCategory(req.body);
  // save data
  await subCategory.save();
  // send response
  res.json({
    message: messages.subCategory.addedSuccessfully,
    data: subCategory,
  });
});

const allSubCategories = catchError(async (req, res, next) => {
  // get data from req.body
  const subCategories = await SubCategory.find().populate("category").populate("createdBy");
  // send response
  if (!subCategories.length) {
    return next(new AppError(messages.subCategory.notFound, 404));
  }
  return res.json({
    message: messages.subCategory.successGet,
    data: subCategories,
  });
});

const getSubCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const subCategory = await SubCategory.findById(req.params.id).populate("category").populate("createdBy");
  // send response
  subCategory || next(new AppError(messages.subCategory.notFound, 404));
  !subCategory ||
    res.json({ message: messages.subCategory.successGet, data: subCategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  // send response
  subCategory || next(new AppError(messages.subCategory.notFound, 404));
  !subCategory ||
    res.json({
      message: messages.subCategory.updatedSuccessfully,
      data: subCategory,
    });
});

const deleteSubCategory = catchError(async (req, res, next) => {
  // get data from req.body
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  // send response
  subCategory || next(new AppError(messages.subCategory.notFound, 404));
  !subCategory ||
    res.json({
      message: messages.subCategory.deletedSuccessfully,
      data: subCategory,
    });
});

export {
  addSubCategory,
  allSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
