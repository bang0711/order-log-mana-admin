import { Item } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  item: Item;
};

function RestaurantItem({ item }: Props) {
  return (
    <div className="p-3 flex items-center gap-3">
      <Image
        alt={item.name}
        src={item.image_url}
        width={100}
        height={100}
        className="size-24"
      />
      <div className="flex flex-col gap-2 justify-between">
        <p className="font-semibold max-w-80 line-clamp-1">{item.name}</p>
        <p className="text-xs text-[#8B96A5] font-medium break-words max-w-80 line-clamp-2">
          {item.description}
        </p>
        <p className="text-xs">{item.price}$</p>
      </div>
    </div>
  );
}

export default RestaurantItem;
