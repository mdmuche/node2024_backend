const express = require("express");

const { product } = require("../model/prodModel");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

let router = express.Router();

//routes
router.get("/home", (req, res) => {
  product
    .find()
    .then((ans) => {
      res.json(ans);
    })
    .catch((err) => {
      res.json(err.message);
    });
  // res.json({ home: "homepage" });
});
router.post("/createproduct", upload.single("prodImg"), async (req, res) => {
  // console.log(req.file);
  // if (req.file) {
  //   console.log("this request has a file");
  //   console.log(req.file);
  //   console.log(req.body);
  // } else {
  //   console.log("this request doesn't have a file");
  // }

  //? steps to create a product
  // upload the image to cloudinary
  let result = await cloudinary.uploader.upload(req.file.path, {
    folder: "ecombackend_product_2024",
  });
  console.log(result);
  res.json(result);

  // extract the public_url and public_id from cloudinary success response
  let prodImg_id = result.secure_url;
  let prodImg_url = result.public_id;
  let { prodName, prodPrice, prodSnippet, prodDetails } = req.body;

  // add public_url and public_id to meet productSchema requirements
  let toDb = {
    prodName,
    prodPrice,
    prodSnippet,
    prodDetails,
    prodImg_id,
    prodImg_url,
  };

  // save to mongodb and send a json response
  let db = new product(toDb);
  db.save()
    .then((ans) => {
      res.json(ans);
    })
    .catch((err) => {
      res.json(err.mesage);
    });

  // res.json({ create: "createproduct page" });
});
router.patch("/updateproduct", (req, res) => {
  res.json({ update: "updateproduct page" });
});
router.delete("/deleteproduct", (req, res) => {
  res.json({ delete: "deleteproduct page" });
});
router.get("/single/:id", (req, res) => {
  res.json({ single: "singleproduct page" });
});
router.get("*", (req, res) => {
  res.json({ error: "error invalid url" });
});

module.exports = {
  router,
};
