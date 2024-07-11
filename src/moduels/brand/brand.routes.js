import { Router } from "express";
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";

export const brandRouter = Router();

brandRouter.route("/").post(addBrand).get(allBrands);
brandRouter.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);
