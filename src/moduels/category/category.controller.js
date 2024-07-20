import slugify from "slugify";
import { Category } from "../../../database/models/category.model.js";
import { messages } from "../../utlities/messages.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utlities/appError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addCategory = catchError(async (req, res) => {
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // get data from req.body
  req.body.image = req.file.filename;
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
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // Find the current category to check the existing image
  const currentCategory = await Category.findById(req.params.id);
  if (!currentCategory)
    return next(new AppError(messages.category.notFound, 404));
  // Check if there's a new image file in the request
  if (req.file) {
    const oldImagePath = path.join(
      currentCategory.image
    );
    console.log("Old Image Path:", oldImagePath);
    console.log("File exists:", fs.existsSync(oldImagePath));
    // Check if the old image exists and is different from the new image
    fs.unlink(oldImagePath, (err) => {
      if (err) {
          console.error("Failed to delete the file:", err);
      } else {
          console.log("File successfully deleted.");
      }
  });
  }
  // get data from req.body
  if (req.file) req.body.image = req.file.filename;
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
