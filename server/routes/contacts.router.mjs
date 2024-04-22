import { Router } from "express";
import { Authenticator } from "../lib/authenticator/index.mjs";
import CheckUser from "../middleware/check-user.mjs";
import UserService from "../services/user.service.mjs";
import UserController from "../controllers/user.controller.mjs";
import ContactsController from "../controllers/contacts.controller.mjs";
import ContactsService from "../services/contacts.service.mjs";
import { AddContactsValidationSchema } from "./validation-routes/index.mjs";
import CheckErrors from "../middleware/check-errors.mjs";

const contactsController = new ContactsController();
const router = Router();

router.use(Authenticator.checkUser);
router.use(CheckUser);

router.use((req, res, next) => {
  req.userService = new UserService();
  req.contactsService = new ContactsService();

  next();
});

router
  .get("/get-contacts", contactsController.getContacts)
  .post(
    "/add-contact",
    AddContactsValidationSchema,
    CheckErrors,
    contactsController.addContact,
  );

export default router;
