const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");
const path = require('path')
dotenv.config();
dbConnection();
//import routes
const authRouter = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoute");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");

const app = express();

//uses
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads",express.static( path.join(__dirname, '/uploads')));

//routes
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/category",  categoryRouter);
app.use("/food", foodRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port", process.env.PORT);
});
