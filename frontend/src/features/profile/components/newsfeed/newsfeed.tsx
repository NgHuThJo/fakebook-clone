import { Image } from "@/components/ui/image";
import styles from "./newsfeed.module.css";
import { thumbs_up_icon } from "@/assets/images/icons";

type FeedData = {
  post: string;
  created: string;
  imgUrl: string;
  likesCount: number;
};

type NewsfeedProps = React.PropsWithoutRef<{ feedData: FeedData[] }>;

export function Newsfeed({ feedData }: NewsfeedProps) {
  return (
    <ul className={styles.feedlist} aria-label="newsfeed">
      {feedData.map((feed, index) => (
        <li className={styles.feed} key={index}>
          <Image src={feed.imgUrl}></Image>
          <p>{feed.post}</p>
          <div>
            <p>Created: {feed.created}</p>
            <button className={styles.likes}>
              <Image className="icon" src={thumbs_up_icon}></Image>
              <p>{feed.likesCount}</p>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
