const express = require("express");

const { router } = require("./routes/productRoutes");
const comm = require("./utils/connectDb");

const app = express();

//middleware
app.use(express.json());
app.use(router);

//start server
comm(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`listening for request at port ${process.env.PORT}`);
  });
});
