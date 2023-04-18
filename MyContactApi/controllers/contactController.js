const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');

// @desc Get all Contacts
// @routes /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res)=> {
    const data = await contactModel.find();
    if (!data) {
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(data);
    // res.status(200).json({ 'message': 'Get All Contacts'});
});

// @desc Get Single Contact
// @routes /api/contacts
// @access public
const getContact = asyncHandler(async (req, res)=> {
    const data = await contactModel.findById(req.params.id);
    if (!data) {
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(data);
    // res.status(200).json({ 'message': `Get Single ${req.params.id}`});
});

// @desc Create Contacts
// @routes /api/contacts
// @access public
const createContact = asyncHandler(async (req, res)=> {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const newContact = await contactModel.create({
        name: name,
        email: email,
        phone: phone
    });
    res.status(200).json({ 'message': 'Create Contacts', 'data': newContact});
    // res.status(200).json({ 'message': 'Create Contacts', 'data': req.body});
});

// @desc Update Contacts
// @routes /api/contacts
// @access public
const updateContact = asyncHandler(async (req, res)=> {
    const data = await contactModel.findById(req.params.id);
    if (!data) {
        res.status(404)
        throw new Error("Contact not found");
    }

    const newUpdatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(newUpdatedContact);
    // res.status(200).json({ 'message': `Update Contacts ${req.params.id}`});
});

// @desc Delete Contacts
// @routes /api/contacts
// @access public
const deleteContact = asyncHandler(async (req, res)=> {
    const data = await contactModel.findById(req.params.id);
    if (!data) {
        res.status(404)
        throw new Error("Contact not found");
    }
    await contactModel.findByIdAndRemove(req.params.id);
    res.status(200).json(data);
    // res.status(200).json({ 'message': `Delete  Contacts ${req.params.id}`});
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};