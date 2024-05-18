import React from "react";
import {
  TableCaption,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableHeader,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Address, Item, Menu } from "@prisma/client";
import DeleteButton from "../delete-button";
import MenuDetail from "./menu-detail";
type Props = {
  menus: (Menu & {
    Address: Address | null;
    Item: Item[] | null;
  })[];
};

function MenuTable({ menus }: Props) {
  return (
    <Table className="w-full">
      <TableCaption>A list of menus.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="">Menu name</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Ward</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map((menu) => (
          <TableRow key={menu.id}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage src={menu.image} alt={menu.name} />
                <AvatarFallback>{menu.name}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{menu.name}</TableCell>
            <TableCell>{menu.Address?.district}</TableCell>
            <TableCell>{menu.Address?.ward}</TableCell>
            <TableCell className="flex items-center gap-2">
              <MenuDetail menu={menu} />
              <DeleteButton id={menu.id} type="menu" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MenuTable;
