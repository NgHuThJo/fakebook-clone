import { Repository } from "./repository.js";
import Post, { IPost } from "@/models/post.js";

export class PostRepository extends Repository<IPost> {
  constructor() {
    super(Post);
  }
}
