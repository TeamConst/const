const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

//import userRouter from "./userRouter";

const router = express.Router();

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

// routes
//router.use("/user", userRouter);

// export default router;
module.exports = router;
