const path = require('path');
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve('./db/contacts.json');

 const listContacts = async() => {
    try {
      const allContacts = await fs.readFile(contactsPath);
      return JSON.parse(allContacts);
   } catch (error) {
      console.error(error);
   }
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const idContact = String(contactId);
    const result = contacts.find(item => item.id === idContact);
    return result || null;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idContact = String(contactId);
    const index = contacts.findIndex(item => item.id === idContact);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newItem = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newItem);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newItem;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}