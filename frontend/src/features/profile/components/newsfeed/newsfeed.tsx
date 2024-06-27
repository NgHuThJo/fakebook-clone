import { Image } from "@/components/ui/image";
import { formatDate } from "@/utils/intl";
import styles from "./newsfeed.module.css";
import { thumbs_up_icon } from "@/assets/images/icons";

type UserData = {
  _id: string;
  username: string;
  email: string;
};

type PostData = {
  author: UserData;
  comments: PostData[];
  created: string;
  likesCount: number;
  _id: string;
  post: string;
  title: string;
};

type FeedData = {
  _id: string;
  post: PostData;
  imgUrl: string;
};

type NewsfeedProps = React.PropsWithoutRef<{ feedData: FeedData[] }>;

export function Newsfeed({ feedData }: NewsfeedProps) {
  return (
    <ul className={styles.feedlist} aria-label="newsfeed">
      {feedData.map((feed, index) => (
        <li className={styles.feed} key={index}>
          <Image src={feed.imgUrl}></Image>
          <p>{feed.post.post}</p>
          <div>
            <p>Created: {feed.post.created}</p>
            <button className={styles.likes}>
              <Image className="icon" src={thumbs_up_icon}></Image>
              <p>{feed.post.likesCount}</p>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
