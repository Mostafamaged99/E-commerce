import { Router } from "express";
import {
  addSubCategory,
  allSubCategories,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "./subCategory.controller.js";

export const subCategoryRouter = Router();

subCategoryRouter.route("/").post(addSubCategory).get(allSubCategories);
subCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);
