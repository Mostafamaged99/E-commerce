import slugify from "slugify";
import { messages } from "../../utlities/messages.js";
import { catchError } from "../../middleware/catchError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { AppError } from "../../utlities/appError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const addBrand = catchError(async (req, res) => {
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // get data from req.body
  req.body.logo = req.file.filename;
  const brand = new Brand(req.body);
  // save data
  await brand.save();
  // send response
  res.json({ message: messages.brand.addedSuccessfully, data: brand });
});

const allBrands = catchError(async (req, res, next) => {
  // get data from req.body
  const brands = await Brand.find().populate("createdBy");
  // send response
  if (!brands.length) {
    return next(new AppError(messages.brand.notFound, 404));
  }
  return res.json({ message: messages.brand.successGet, data: brands });
});

const getBrand = catchError(async (req, res, next) => {
  // get data from req.body
  const brand = await Brand.findById(req.params.id).populate("createdBy");
  // send response
  brand || next(new AppError(messages.brand.notFound, 404));
  !brand || res.json({ message: messages.brand.successGet, data: brand });
});

const updateBrand = catchError(async (req, res, next) => {
  // slugify the name
  if (req.body.slug) req.body.slug = slugify(req.body.name);
  // // Find the current category to check the existing image
  // const currentBrand = await Brand.findById(req.params.id);
  // if (!currentBrand) return next(new AppError(messages.brand.notFound, 404));
  // // Check if there's a new image file in the request
  // if (req.file) {
  //   const oldImagePath = path.join(currentBrand.logo);
  //   console.log("Old Image Path:", oldImagePath);
  //   console.log("File exists:", fs.existsSync(oldImagePath));
  //   // Check if the old image exists and is different from the new image
  //   fs.unlink(oldImagePath, (err) => {
  //     if (err) {
  //       console.error("Failed to delete the file:", err);
  //     } else {
  //       console.log("File successfully deleted.");
  //     }
  //   });
  // }
  // get data from req.body
  if (req.file) req.body.image = req.file.filename;
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // send response
  brand || next(new AppError(messages.brand.notFound, 404));
  !brand ||
    res.json({ message: messages.brand.updatedSuccessfully, data: brand });
});

const deleteBrand = catchError(async (req, res, next) => {
  // get data from req.body
  const brand = await Brand.findByIdAndDelete(req.params.id, {
    new: true,
  });
  // send response
  brand || next(new AppError(messages.brand.notFound, 404));
  !brand ||
    res.json({ message: messages.brand.deletedSuccessfully, data: brand });
});

export { addBrand, allBrands, getBrand, updateBrand, deleteBrand };
