import { DB } from "../DBConfig/configDB.mjs";

class ContactsService {
  constructor() {
    this.db = DB;
  }

  getCurrentsUserContacts = ({ currentUserId }) =>
    this.db("user_contacts")
      .where("owner_user_id", currentUserId)
      .leftJoin("users as u", "user_contacts.contact_user_id", "u.id")
      .select(["u.*"]);

  addContact = async ({ currentUserId, contacts }) => {
    const preparedData = contacts.map((contactId) => ({
      owner_user_id: currentUserId,
      contact_user_id: contactId,
    }));

    await this.db("user_contacts").insert(preparedData);
  };
}

export default ContactsService;
