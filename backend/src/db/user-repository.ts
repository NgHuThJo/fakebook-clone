import Repository from "./repository.js";
import user, { IUser } from "@/models/user.js";

class UserRepository extends Repository<IUser> {
  constructor() {
    super(user);
  }
}

export default new UserRepository();
