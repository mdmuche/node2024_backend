const { product } = require("../model/prodModel");
const { cloudinary } = require("../utils/cloudinary");

const allproducts_get = (req, res) => {
  product
    .find()
    .then((ans) => {
      res.json(ans);
    })
    .catch((err) => {
      res.json(err.message);
    });
  // res.json({ home: "homepage" });
};

const createproduct_post = async (req, res) => {
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
  // console.log(result);
  // res.json(result);

  // extract the public_url and public_id from cloudinary success response
  let prodImg_id = result.public_id;
  let prodImg_url = result.secure_url;
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
};

const updateproduct_patch = async (req, res) => {
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
      .catch((err) => {
        res.json({ status: false });
      });
  }

  // res.json({ update: "updateproduct page" });
};

const deleteproduct = async (req, res, next) => {
  //? steps
  //1. get id
  let { id } = req.body;
  try {
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
  } catch (error) {
    next(error);
  }

  // res.json({ delete: "deleteproduct page" });
};

const singleproduct_get = (req, res) => {
  let { id } = req.params;
  product
    .findById(id)
    .then((ans) => {
      res.json(ans);
    })
    .catch((err) => {
      res.json({ status: false });
    });
  // res.json({ single: "singleproduct page" });
};

const productlike_post = (req, res) => {
  let { id, like } = req.body;
  product
    .findByIdAndUpdate(id, { $inc: { prodLikes: like } })
    .then((ans) => {
      res.json({ status: true });
    })
    .catch((err) => {
      res.json({ status: false });
    });
  // res.json({ id, like });
  // res.json({ prodlikes: "prodlikes page" });
};

module.exports = {
  allproducts_get,
  createproduct_post,
  updateproduct_patch,
  deleteproduct,
  singleproduct_get,
  productlike_post,
};
