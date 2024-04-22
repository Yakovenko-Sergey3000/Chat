class ContactsController {
  getContacts = async (req, res) => {
    try {
      const contacts = await req.contactsService.getCurrentsUserContacts({
        currentUserId: req.user.id,
      });

      res.json(
        contacts.map((contact) => {
          delete contact.password;

          return contact;
        }),
      );
    } catch (e) {
      res.status(400).json({ error_message: e.message });
    }
  };

  addContact = async (req, res) => {
    const { contacts = [] } = req.body;

    try {
      const userContacts = await req.contactsService.getCurrentsUserContacts({
        currentUserId: req.user.id,
      });

      const filteredContacts = contacts.filter(
        (userId) => !userContacts.find((user) => user.user_id === userId),
      );

      if (filteredContacts.length) {
        const selected_users = await req.userService.getUserByUserIds({
          userIds: filteredContacts,
        });

        await req.contactsService.addContact({
          currentUserId: req.user.id,
          contacts: selected_users.map((u) => u.id),
        });
      }

      res.json({ message: `Добавленно ${filteredContacts.length} контактов` });
    } catch (e) {
      res.status(400).json({ error_message: e.message });
    }
  };
}

export default ContactsController;
