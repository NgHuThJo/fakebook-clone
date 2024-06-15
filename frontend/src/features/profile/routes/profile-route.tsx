import { ChangeEvent, useState } from "react";
import { facebook_logo_icon } from "@/assets/images/icons";
import { Image } from "@/components/ui/image";
import { SearchBar } from "@/components/ui/searchbar";

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <nav>
      <Image className="icon" src={facebook_logo_icon} alt="" />
      <SearchBar placeholder="Search" onChange={handleSearch}></SearchBar>
    </nav>
  );
}
