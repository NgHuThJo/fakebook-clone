import Repository from "./repository.js";
import friendship, { IFriendship } from "@/models/friendship.js";

class FriendshipRepository extends Repository<IFriendship> {
  constructor() {
    super(friendship);
  }
}

export default new FriendshipRepository();
