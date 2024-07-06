import Repository from "./repository.js";
import like, { ILike } from "@/models/like.js";

class LikeRepository extends Repository<ILike> {
  constructor() {
    super(like);
  }

  async countLikes(postId: string) {
    return like.countDocuments({ post: postId });
  }
}

export default new LikeRepository();
