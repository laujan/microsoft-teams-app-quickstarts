const express = require("express");
const router = express.Router();

const userService = require("../user-service");

router.get("/user/image", (req, res, next) => {
  userService.getImage(req, res);
});

module.exports = router;
