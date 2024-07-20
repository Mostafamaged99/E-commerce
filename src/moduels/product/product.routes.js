import { Router } from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { uplaodMixOfFiles } from "../../fileUpload/fileUpload.js";
// import { addProductVal } from "./product.validation.js";
// import { validate } from "../../middleware/validate.js";

export const productRouter = Router();

productRouter
  .route("/")
  .post(
    uplaodMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    // validate(addProductVal),
    addProduct
  )
  .get(allProducts);
productRouter
  .route("/:id")
  .get(getProduct)
  .put(
    uplaodMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    updateProduct
  )
  .delete(deleteProduct);
