const express = require("express");

const upload = require("../utils/multer");
const {
  allproducts_get,
  createproduct_post,
  updateproduct_patch,
  deleteproduct,
  singleproduct_get,
  productlike_post,
  errorpage,
} = require("./controllers/productControllers");

let router = express.Router();

//routes
router.get("/home", allproducts_get);
router.post("/createproduct", upload.single("prodImg"), createproduct_post);
router.patch("/updateproduct", upload.single("prodImg"), updateproduct_patch);
router.post("/deleteproduct", deleteproduct);
router.get("/single/:id", singleproduct_get);
router.post("/like", productlike_post);
router.get("*", errorpage);

module.exports = {
  router,
};
