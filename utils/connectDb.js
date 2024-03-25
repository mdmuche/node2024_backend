const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const comm = async (cb) => {
  try {
    let db = await mongoose.connect(process.env.URL);
    if (db.STATES.connected === 1) {
      console.log("connection to db was successful");
      cb();
    } else {
      console.log("connection to db wasn't successful");
    }
  } catch (err) {
    console.log(`connection to db wasn't successful: ${err}`);
  }
};

module.exports = comm;
