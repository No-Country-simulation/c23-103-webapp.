// controllers/contactController.js
const { Contact, User } = require('../models');

exports.addContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user.id; // Asignado por authMiddleware
    if (userId === contactId) {
      return res.status(400).json({ message: "You can't add yourself as a contact" });
    }
    const contact = await Contact.create({ userId, contactId });
    res.status(201).json({ message: 'Contact added successfully', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listContacts = async (req, res) => {
  try {
    const userId = req.user.id; // Asignado por authMiddleware
    const contacts = await Contact.findAll({
      where: { userId },
      include: [{ model: User, attributes: ['id', 'username', 'email'] }],
    });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
