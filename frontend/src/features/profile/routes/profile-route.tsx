// Third party
import { ChangeEvent, useState } from "react";
import { useLoaderData } from "react-router-dom";
// Components
import { Navigation } from "@/features/shared/navigation/navigation";
import { Newsfeed } from "../components/newsfeed/newsfeed";
import { Sidebar } from "../components/sidebar/sidebar";
import { Userlist } from "../components/userlist/userlist";
// Lib
import { ApiClient } from "@/lib/apiClient";
// Styles
import styles from "./profile-route.module.css";

export const profileLoader = (apiClient: ApiClient) => async () => {
  const res = await apiClient.get("/profile");

  return res;
};

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");
  const loaderData = useLoaderData();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <>
      <Navigation onChange={handleSearch} />
      <main className={styles.main}>
        <Sidebar />
        <Newsfeed />
        {<Userlist userData={loaderData.users} />}
      </main>
    </>
  );
}
