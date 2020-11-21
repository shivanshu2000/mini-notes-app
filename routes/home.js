const express = require("express");
const homeController = require("../controllers/home");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const router = express.Router();

router.get("/", ensureAuthenticated, homeController.getHome);
router.get("/login", forwardAuthenticated, homeController.getLogin);
router.get("/signup", forwardAuthenticated, homeController.getSignup);
router.post("/signup", homeController.postSignup);
router.post("/login", homeController.postLogin);
router.get("/logout", ensureAuthenticated, homeController.getLogout);
router.post("/", ensureAuthenticated, homeController.postCollection);
router.get(
  "/collections/:id",
  ensureAuthenticated,
  homeController.getSingleCollection
);
router.post(
  "/collections/:id",
  ensureAuthenticated,
  homeController.postSingleCollection
);
router.post(
  "/collections/delete/:id1/:id2",
  ensureAuthenticated,
  homeController.postDeleteNote
);
router.post(
  "/deleteCollection/:id",
  ensureAuthenticated,
  homeController.postDeleteCollection
);

module.exports = router;
