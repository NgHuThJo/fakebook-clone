import { ChangeEvent, useState } from "react";
import {
  add_icon,
  exit_icon,
  facebook_logo_icon,
  group_icon,
  home_icon,
  notification_icon,
  storefront_icon,
  subscription_icon,
} from "@/assets/images/icons";
import { Image } from "@/components/ui/image";
import { Navigation } from "@/components/ui/navigation";
import { SearchBar } from "@/components/ui/searchbar";

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <Navigation>
      <Image className="icon" src={facebook_logo_icon} alt="" />
      <SearchBar placeholder="Search" onChange={handleSearch}></SearchBar>
      <Image className="icon" src={home_icon}></Image>
      <Image className="icon" src={subscription_icon}></Image>
      <Image className="icon" src={storefront_icon}></Image>
      <Image className="icon" src={group_icon}></Image>
      <Image className="icon" src={add_icon}></Image>
      <Image className="icon" src={notification_icon}></Image>
      <Image className="icon" src={exit_icon}></Image>
    </Navigation>
  );
}
