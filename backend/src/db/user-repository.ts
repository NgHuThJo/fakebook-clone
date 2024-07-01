import { Repository } from "./repository.js";
import User, { IUser } from "@/models/user.js";

class UserRepository extends Repository<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
