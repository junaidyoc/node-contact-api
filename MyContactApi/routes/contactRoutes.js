const express = require('express');
const contactRouter = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
} = require('../controllers/ContactController');

// res.send('Get All Contacts');
// res.json({ 'message':'Get All Contacts'});

contactRouter.route('/').get(getContacts);

contactRouter.route('/:id').get(getContact);

contactRouter.route('/').post(createContact);

contactRouter.route('/:id').put(updateContact);

contactRouter.route('/:id').delete(deleteContact);

module.exports = contactRouter