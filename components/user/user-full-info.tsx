import { UserWithRelations } from "@/app/users/page";
import React, { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserInfo from "./user-info";
import UserMenu from "./user-menu";
import { Address, Item, Menu } from "@prisma/client";

type Props = {
  user: UserWithRelations;
  setCurrentMenu: Dispatch<
    SetStateAction<(Menu & { Item: Item[]; Address: Address | null }) | null>
  >;
};

function UserFullInfo({ user, setCurrentMenu }: Props) {
  const userInfoList = [
    {
      title: "Full Name",
      value: user.name,
    },
    {
      title: "Email",
      value: user.email,
    },
    {
      title: "Phone",
      value: user.phone_number,
    },
  ];

  return (
    <>
      <DialogTitle className="text-center text-2xl">
        User Information
      </DialogTitle>
      <Avatar className="mx-auto">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-3">
        {userInfoList.map((info) => (
          <UserInfo key={info.title} title={info.title} value={info.value} />
        ))}
      </div>
      <hr className="border" />
      <h1 className="font-semibold">User Menu</h1>
      <UserMenu
        setCurrentMenu={setCurrentMenu}
        menus={user.Menu_Menu_user_idToUser}
      />
    </>
  );
}

export default UserFullInfo;
