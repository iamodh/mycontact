const express = require("express");
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");

/* Controllers */
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
} = require("../controllers/contactController");

const router = express.Router();
router.use(cookieParser());

router.route("/").get(checkLogin, getAllContacts);
router.route("/add").all(checkLogin).get(addContactForm).post(createContact);

router
  .route("/:id")
  .all(checkLogin)
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
