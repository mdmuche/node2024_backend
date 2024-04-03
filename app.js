const express = require("express");
const cors = require("cors");

const { router } = require("./routes/productRoutes");
const comm = require("./utils/connectDb");
let origin = ["http://localhost:3000"];

const app = express();

//middleware
app.use(cors({ credentials: true, origin: origin }));
app.use(express.json());
app.use(router);

//start server
comm(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`listening for request at port ${process.env.PORT}`);
  });
});
