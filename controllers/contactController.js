const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).render("index", { contacts });
});

// @desc Create contacts
// @route Post /contacts
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);
  if (!name || !email || !phone) {
    return res.status(400).send("입력 필드를 모두 채워주세요.");
  }
  const contact = await Contact.create({ name, email, phone });
  res.status(201).redirect("/contacts");
});

// @desc Get a contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200).render("update", { contact });
});

// @desc Put a contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("연락처가 없습니다.");
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  contact.save();
  res.status(200).redirect("/contacts");
});

// @desc Delete contacts
// @route Delete /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);
  res.status(200).redirect("/contacts");
});

const addContactForm = asyncHandler(async (req, res) => {
  res.status(200).render("add");
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
};
