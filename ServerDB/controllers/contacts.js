const db = require('../models');
const Contacts = require('../models/contact')(db.sequelize, db.Sequelize);

const getAllContacts = async (req) => {
   const contacts = await Contacts.findAll();

   if (contacts.length === 0) throw new Error('Aún no hay mensajes de contacto.');

   return { contacts };
};


const createContact = async (req) => {

  const newContact = req.body;   

  const contactCreated = await Contacts.create(newContact);  
  
  return { contact: contactCreated };
}

module.exports = {
  getAllContacts,
  createContact
};