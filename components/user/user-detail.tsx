"use client";
import { Address, Item, Menu } from "@prisma/client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

import { UserWithRelations } from "@/app/users/page";
import UserMenuDetail from "./user-menu-detail";
import UserFullInfo from "./user-full-info";
type Props = {
  user: UserWithRelations;
};

function UserDetail({ user }: Props) {
  const [currentMenu, setCurrentMenu] = useState<
    (Menu & { Item: Item[]; Address: Address | null }) | null
  >(null);

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent isShowCloseButton={currentMenu !== null ? false : true}>
        {!currentMenu ? (
          <>
            <UserFullInfo setCurrentMenu={setCurrentMenu} user={user} />
          </>
        ) : (
          <>
            <UserMenuDetail
              setCurrentMenu={setCurrentMenu}
              currentMenu={currentMenu}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UserDetail;
