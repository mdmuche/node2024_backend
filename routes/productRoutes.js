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
router.patch("/updateproduct", upload.single("prodImg"), async (req, res) => {
  // let { upd, id } = req.body;
  // console.log(upd);
  // res.json({ update: upd, id });
  let { prodName, prodPrice, prodSnippet, prodDetails, id } = req.body;
  // put all defined key from req.body to upd
  let upd = {};
  if (prodName) {
    upd["prodName"] = prodName;
  }
  if (prodPrice) {
    upd["prodPrice"] = prodPrice;
  }
  if (prodSnippet) {
    upd["prodSnippet"] = prodSnippet;
  }
  if (prodDetails) {
    upd["prodDetails"] = prodDetails;
  }
  console.log(upd);
  if (req.file) {
    // res.json({ res: "this request has a file", id, upd });
    // get product from db using id
    let toUpd = await product.findById(id);
    // delete image from cloudinary using prodImg_id from toupd
    let remImg = await cloudinary.uploader.destroy(toUpd.prodImg_id);
    // upload new image to cloudinary
    let newImg = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecombackend_product_2024",
    });
    // add prodImg_id and prodImg_url to upd
    upd["prodImg_id"] = newImg.public_id;
    upd["prodImg_url"] = newImg.secure_url;

    //4. update to db
    product
      .findByIdAndUpdate(id, { $set: upd })
      .then((ans) => {
        res.json({ status: true });
      })
      .catch((err) => {
        res.json({ status: false });
      });
  } else {
    // res.json({ res: "this request doesn't have a file", upd, id});
    product
      .findByIdAndUpdate(id, {
        $set: upd,
      })
      .then((ans) => {
        res.json({ status: true });
      })
      .then((err) => {
        res.json({ status: false });
      });
  }

  // res.json({ update: "updateproduct page" });
});
router.delete("/deleteproduct", async (req, res) => {
  //? steps
  //1. get id
  let { id } = req.body;
  //2. get product to delete from db
  let toDel = await product.findById(id);
  //3. delete from cloudinary using prodimg_id
  let remImg = await cloudinary.uploader.destroy(toDel.prodImg_id);
  //4.delete from db using id and send json response
  product
    .findByIdAndDelete(id)
    .then((ans) => {
      res.json(ans);
    })
    .catch((err) => {
      res.json(err.message);
    });

  // res.json({ delete: "deleteproduct page" });
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
