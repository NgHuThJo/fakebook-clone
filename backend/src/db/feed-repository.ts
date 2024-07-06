import Repository from "./repository.js";
import feed, { IFeed } from "@/models/feed.js";

class FeedRepository extends Repository<IFeed> {}

export default new FeedRepository(feed);
