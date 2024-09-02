const asyncHandler = require("express-async-handler");
const Contact = require("../model/contact");

const getAllContact = asyncHandler(async (req, res) => {
  const data = await Contact.find({ user_id: req.user.id });
  if (data.length <= 0) {
    res.status(400);
    // throw new Error("No data found");
  }

  res.status(200).json(data);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existContact = await Contact.findOne({ phone });
  if (existContact) {
    return res.status(400).json({ message: "Contact Number Already Exist..!" });
  }

  const newData = await Contact.create({
    name,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json({ success: "true", newData });
});

const getContact = asyncHandler(async (req, res) => {
  const data = await Contact.findOne({ _id: req.params.id });
  if (!data) {
    res.status(400);
    throw new Error("No data found");
  }
  res.status(200).json({ data });
});
const updateContact = asyncHandler(async (req, res) => {
  const data = await Contact.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("No data found");
  }

  if (data.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have permission to update contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: "true", updatedContact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const data = await Contact.findOne({ _id: req.params.id });
  if (!data) {
    res.status(400);
    throw new Error("No data found");
  }

  if (data.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have permission to Delete contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: "true", data });
});

module.exports = {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
