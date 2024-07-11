import slugify from "slugify";
import { Product } from "../../../database/models/product.models.js";
import { messages } from "../../utlities/messages.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utlities/appError.js";

const addProduct = catchError(async (req, res) => {
  // slugify the name
  req.body.slug = slugify(req.body.name);
  // get data from req.body
  const product = new Product(req.body);
  // save data
  await product.save();
  // send response
  res.json({ message: messages.product.addedSuccessfully, data: product });
});

const allProducts = catchError(async (req, res, next) => {
  // get data from req.body
  const products = await Product.find()
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .populate("createdBy");
  // send response
  products || next(new AppError(messages.product.notFound, 404));
  !products ||
    res.json({ message: messages.product.successGet, data: products });
});

const getProduct = catchError(async (req, res, next) => {
  // get data from req.body
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .populate("createdBy");
  // send response
  product || next(new AppError(messages.product.notFound, 404));
  !product || res.json({ message: messages.product.successGet, data: product });
});

const updateProduct = catchError(async (req, res, next) => {
  // get data from req.body
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // send response
  product || next(new AppError(messages.product.notFound, 404));
  !product ||
    res.json({ message: messages.product.updatedSuccessfully, data: product });
});

const deleteProduct = catchError(async (req, res, next) => {
  // get data from req.body
  const product = await Product.findByIdAndDelete(req.params.id, {
    new: true,
  });
  // send response
  product || next(new AppError(messages.product.notFound, 404));
  !product ||
    res.json({ message: messages.product.deletedSuccessfully, data: product });
});

export { addProduct, allProducts, getProduct, updateProduct, deleteProduct };
