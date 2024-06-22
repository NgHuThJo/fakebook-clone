import { Image } from "@/components/ui/image";

export function Userlist({ userData }) {
  console.log(userData);

  return (
    <ul>
      {userData.map((user) => (
        <li>
          <Image className="icon" src={user.avatarUrl}></Image>
          <p>{user.username}</p>
        </li>
      ))}
    </ul>
  );
}
