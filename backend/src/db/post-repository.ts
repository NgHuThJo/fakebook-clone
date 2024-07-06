import Repository from "./repository.js";
import post, { IPost } from "@/models/post.js";

class PostRepository extends Repository<IPost> {}

export default new PostRepository(post);
