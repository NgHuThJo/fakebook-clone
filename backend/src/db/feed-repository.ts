import { Repository } from "./repository.js";
import Feed, { IFeed } from "@/models/feed.js";

export class UserRepository extends Repository<IFeed> {
  constructor() {
    super(Feed);
  }
}
