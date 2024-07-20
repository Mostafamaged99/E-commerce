import { Router } from "express";
import {
  addBrand,
  allBrands,
  deleteBrand,
  getBrand,
  updateBrand,
} from "./brand.controller.js";
import { uplaodSingleFile } from "../../fileUpload/fileUpload.js";

export const brandRouter = Router();

brandRouter
  .route("/")
  .post(uplaodSingleFile("logo", "brands"), addBrand)
  .get(allBrands);
brandRouter
  .route("/:id")
  .get(getBrand)
  .put(uplaodSingleFile("logo", "brands"), updateBrand)
  .delete(deleteBrand);
