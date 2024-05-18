import { Address, Item, Menu } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

type Props = {
  menus: (Menu & { Item: Item[]; Address: Address | null })[];
  setCurrentMenu: Dispatch<
    SetStateAction<(Menu & { Item: Item[]; Address: Address | null }) | null>
  >;
};

function UserMenu({ menus, setCurrentMenu }: Props) {
  return (
    <ScrollArea className="w-full h-52 rounded-md p-4">
      <div className="gap-3 grid grid-cols-3">
        {menus.map((menu) => (
          <div
            onClick={() => setCurrentMenu(menu)}
            key={menu.id}
            className="p-2 border flex items-center gap-2 max-w-40 break-words line-clamp-1 cursor-pointer"
          >
            <Image
              alt={menu.name}
              src={menu.image}
              width={100}
              height={100}
              className="size-16"
            />
            <p>{menu.name}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
export default UserMenu;
