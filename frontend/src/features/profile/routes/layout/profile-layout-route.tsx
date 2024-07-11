import { ChangeEvent, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "@/features/shared/navigation/navigation";

export function ProfileLayoutRoute() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <>
      <Navigation onChange={handleSearch} />
      <Outlet />
    </>
  );
}
