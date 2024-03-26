const express = require("express");

const upload = require("../utils/multer");

const router = express.Router();

//routes
router.get("/home", (req, res) => {
  res.json({ home: "homepage" });
});
router.post("/createproduct", upload.single("prodImg"), (req, res) => {
  res.json({ create: "createproduct page" });
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
