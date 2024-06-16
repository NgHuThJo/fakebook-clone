import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { Navigation } from "@/components/ui/navigation";
import { SearchBar } from "@/components/ui/searchbar";
// Assets
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

export function ProfileRoute() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <Navigation className="facebook">
      <div data-start>
        <Link to="/" replace>
          <Image className="icon" src={facebook_logo_icon} alt="" />
        </Link>
        <SearchBar placeholder="Search" onChange={handleSearch}></SearchBar>
      </div>
      <div data-center>
        <Link to="/" replace>
          <Image className="icon" src={home_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={subscription_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={storefront_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={group_icon}></Image>
        </Link>
      </div>
      <div data-end>
        <Link to="/" replace>
          <Image className="icon" src={add_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={notification_icon}></Image>
        </Link>
        <Link to="/" replace>
          <Image className="icon" src={exit_icon}></Image>
        </Link>
      </div>
    </Navigation>
  );
}
