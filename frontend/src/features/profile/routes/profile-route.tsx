// Third party
import { ChangeEvent, useState } from "react";
import { useLoaderData } from "react-router-dom";
// Components
import { Navigation } from "@/features/shared/navigation/navigation";
import { Newsfeed } from "../components/newsfeed/newsfeed";
import { Sidebar } from "../components/sidebar/sidebar";
import { Userlist } from "../components/userlist/userlist";
// Api
import { getFeeds } from "../api/feed";
import { getUsers } from "../api/user";
import { ApiClient } from "@/lib/apiClient";
// Types
import { ObjectKey } from "@/types";
// Styles
import styles from "./profile-route.module.css";

export const profileLoader = (apiClient: ApiClient) => async () => {
  const [feeds, users] = await Promise.all([
    getFeeds(apiClient),
    getUsers(apiClient),
  ]);

  console.log(feeds, users);

  return { feeds, users };
};

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");
  const loaderData = useLoaderData() as Record<ObjectKey, any>;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <>
      <Navigation onChange={handleSearch} />
      <main className={styles.main}>
        <Sidebar />
        {loaderData && (
          <>
            <Newsfeed feedData={loaderData.feeds} />
            <Userlist userData={loaderData.users} />
          </>
        )}
      </main>
    </>
  );
}
