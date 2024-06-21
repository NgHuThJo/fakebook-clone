import { ChangeEvent, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "@/features/profile/components/navigation/navigation";
import { Sidebar } from "../components/sidebar/sidebar";
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
        <Outlet />
      </main>
      <Sidebar />
    </>
  );
}
