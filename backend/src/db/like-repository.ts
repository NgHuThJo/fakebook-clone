import { Repository } from "./repository.js";
import Like, { ILike } from "@/models/like.js";

export class UserRepository extends Repository<ILike> {
  constructor() {
    super(Like);
  }
}
