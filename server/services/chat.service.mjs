import {DB} from "../DBConfig/configDB.mjs";

class ChatService {
  constructor() {
    this.db = DB;
  }
   getRoom = async () => {}
   createRoom = async () => {}
   removeRoom = async () => {}
   updateRoom = async () => {}
   clearHistory = async () => {}
   createGroupRoom = async () => {}
   removerGroupRoom = async () => {}
   addUsersToGroupRoom = async () => {}
   removeUsersFromGroup = async () => {}
   getMessages = async () => {}
   removeMessages = async () => {}
}

export default ChatService