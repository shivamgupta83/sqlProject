const homeController = require("../controller/home.controller.js");

const router = require("express").Router();

router.post("/creatUser", homeController.createUserAndData);

router.get("/getCommonUsers", homeController.getCommonUsers);

router.get("/pagination", homeController.pagination);

router.get("/getUsers", homeController.getUsers);

module.exports = router;