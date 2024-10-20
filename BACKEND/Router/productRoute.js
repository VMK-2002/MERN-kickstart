import express from "express";

const route = express.Router();

import { deleteProducts, getProducts, postProducts, updateProducts } from "../Controller/productController.js";

route.put("/:id", updateProducts);

route.get("/", getProducts);

route.post("/", postProducts);

route.delete("/:id", deleteProducts);

export default route;