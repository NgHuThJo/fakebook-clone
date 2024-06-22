// Third party
import { ChangeEvent, useState } from "react";
// Components
import { Navigation } from "@/features/shared/navigation/navigation";
import { Newsfeed } from "../components/newsfeed/newsfeed";
import { Sidebar } from "../components/sidebar/sidebar";
import { Userlist } from "../components/userlist/userlist";
// Lib
// Styles
import styles from "./profile-route.module.css";

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <>
      <Navigation onChange={handleSearch} />
      <main className={styles.main}>
        <Sidebar />
        <Newsfeed />
        <Userlist />
      </main>
    </>
  );
}
