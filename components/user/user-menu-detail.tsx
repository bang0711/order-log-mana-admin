import { Address, Item, Menu } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import Image from "next/image";
import MenuInfo from "../menu/menu-info";
import { ScrollArea } from "../ui/scroll-area";
import MenuItem from "../menu/menu-item";
import { ArrowLeft } from "lucide-react";

type Props = {
  currentMenu: (Menu & { Item: Item[]; Address: Address | null }) | null;
  setCurrentMenu: Dispatch<
    SetStateAction<(Menu & { Item: Item[]; Address: Address | null }) | null>
  >;
};

function UserMenuDetail({ currentMenu, setCurrentMenu }: Props) {
  const menuInfoList = [
    {
      title: "Menu name",
      value: currentMenu?.name,
    },
    {
      title: "Province/City",
      value: currentMenu?.Address?.city,
    },
    {
      title: "District",
      value: currentMenu?.Address?.district,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <DialogTitle className="text-2xl">Menu information</DialogTitle>
        <ArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => setCurrentMenu(null)}
        />
      </div>

      <h1 className="font-semibold text-sm">Product Images</h1>
      <div className="grid gap-4 grid-cols-2">
        <Image
          alt={currentMenu?.name!}
          src={currentMenu?.image!}
          width={250}
          height={250}
          className="w-full h-full"
        />

        <div className="flex flex-col gap-3 justify-between">
          {menuInfoList.map((info) => (
            <MenuInfo
              key={info.title}
              title={info.title}
              value={info.value as string}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <div className="space-y-3">
          <h1 className="font-semibold text-sm">Description</h1>{" "}
          <ScrollArea className="h-52 w-full rounded-md border p-4">
            {currentMenu?.description}
          </ScrollArea>
        </div>

        <div className="space-y-3">
          <h1 className="font-semibold text-sm">Menu Items</h1>{" "}
          <ScrollArea className="h-52 w-full rounded-md border p-4">
            {currentMenu?.Item?.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default UserMenuDetail;
