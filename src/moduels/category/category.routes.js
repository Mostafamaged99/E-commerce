import { Router } from "express";
import { addCategory, allcategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";

export const categoryRouter = Router();

categoryRouter.route("/").post(addCategory).get(allcategories);
categoryRouter.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
