import { Router } from "express";
import {
  addCategory,
  allcategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { uplaodSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryVal } from "./category.validation.js";
import { subCategoryRouter } from "../subCategory/subCategory.routes.js";

export const categoryRouter = Router();

categoryRouter.use("/:category/sub-categories", subCategoryRouter);
categoryRouter
  .route("/")
  .post(uplaodSingleFile("image", "categories"),validate(addCategoryVal), addCategory)
  .get(allcategories);
categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(uplaodSingleFile("image", "categories"), updateCategory)
  .delete(deleteCategory);
