"use client";
import { Shop, Address, Brand, Item } from "@prisma/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import RestaurantItem from "./restaurant-item";
import RestaurantDetailPagination from "./restaurant-detail-pagination";
type Props = {
  restaurant: Shop & {
    Address: Address | null;
    Brand: Brand | null;
    Item: Item[] | null;
  };
};
const ITEMS_PER_PAGE = 6;
const PAGE_DISPLAY_LIMIT = 3;
function RestaurantDetail({ restaurant }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = restaurant.Item?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentItems = restaurant.Item?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <Image
          src={restaurant.Brand?.image_url as string}
          alt={restaurant.name}
          width={150}
          height={150}
          className="mx-auto size-36"
        />
        <DialogTitle className="mx-auto text-center p-3">
          {restaurant.name}
        </DialogTitle>
        <hr className="border-gray-400" />
        <DialogTitle className="text-2xl">Menu</DialogTitle>
        <div className="grid grid-cols-3 gap-3">
          {currentItems?.map((item) => (
            <RestaurantItem item={item} key={item.id} />
          ))}
        </div>
        <RestaurantDetailPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          PAGE_DISPLAY_LIMIT={PAGE_DISPLAY_LIMIT}
        />
      </DialogContent>
    </Dialog>
  );
}

export default RestaurantDetail;
