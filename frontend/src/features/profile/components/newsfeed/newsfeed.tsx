import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { apiClient } from "@/lib/apiClient";
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
  const [data, setData] = useState(feedData);
  const abortControllerRef = useRef<AbortController | null>(null);

  console.log(data);

  const handleLikes = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const res = await apiClient.post(
        "/profile/likes",
        { postId },
        {
          signal: abortControllerRef.current.signal,
        }
      );

      setData((prevData) =>
        prevData.map((data) =>
          data.post._id === postId
            ? {
                ...data,
                post: { ...data.post, likesCount: res.likesCount },
              }
            : data
        )
      );
    } catch (error) {
      console.error("Error updating likes:", (error as Error).message);
    }
  };

  return (
    <ul className={styles.feedlist} aria-label="newsfeed">
      {data.map((feed, index) => (
        <li className={styles.feed} key={index}>
          <Image src={feed.imgUrl}></Image>
          <h2>{feed.post.title}</h2>
          <p>{feed.post.post}</p>
          <div>
            <Link to="/">User: {feed.post.author.username}</Link>
            <p>Created: {feed.post.created}</p>
            <button
              className={styles.likes}
              onClick={(event) => {
                handleLikes(event, feed.post._id);
              }}
            >
              <Image className="icon" src={thumbs_up_icon}></Image>
              <p>{feed.post.likesCount}</p>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
