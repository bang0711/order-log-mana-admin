import { Address, Item, Menu } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import MenuInfo from "./menu-info";
import MenuItem from "./menu-item";
type Props = {
  menu: Menu & {
    Address: Address | null;
    Item: Item[] | null;
  };
};

function MenuDetail({ menu }: Props) {
  const menuInfoList = [
    {
      title: "Menu name",
      value: menu.name,
    },
    {
      title: "Province/City",
      value: menu.Address?.city,
    },
    {
      title: "District",
      value: menu.Address?.district,
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl">Menu information</DialogTitle>
        <h1 className="font-semibold text-sm">Product Images</h1>
        <div className="grid gap-4 grid-cols-2">
          <Image
            alt={menu.name}
            src={menu.image}
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
              {menu.description}
            </ScrollArea>
          </div>

          <div className="space-y-3">
            <h1 className="font-semibold text-sm">Menu Items</h1>{" "}
            <ScrollArea className="h-52 w-full rounded-md border p-4">
              {menu.Item?.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MenuDetail;
