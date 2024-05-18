import { Address, Brand, Item, Shop } from "@prisma/client";
import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RestaurantDetail from "./restaurant-detail";
import DeleteButton from "../delete-button";

type Props = {
  restaurants: (Shop & {
    Address: Address | null;
    Brand: Brand | null;
    Item: Item[] | null;
  })[];
};

function RestaurantsTable({ restaurants }: Props) {
  return (
    <Table className="w-full">
      <TableCaption>A list of restaurants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Restaurant Name</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Ward</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {restaurants.map((restaurant) => (
          <TableRow key={restaurant.id}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage
                  src={restaurant.Brand?.image_url}
                  alt={restaurant.name}
                />
                <AvatarFallback>{restaurant.name}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.Address?.district}</TableCell>
            <TableCell>{restaurant.Address?.ward}</TableCell>
            <TableCell className="flex items-center gap-2 mx-auto">
              <RestaurantDetail restaurant={restaurant} />
              <DeleteButton id={restaurant.id} type="shop" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RestaurantsTable;
