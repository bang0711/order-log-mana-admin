import { Item } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  item: Item;
};

function MenuItem({ item }: Props) {
  return (
    <div className="mb-3 gap-2 flex items-center">
      <Image
        alt={item.name}
        src={item.image_url}
        width={100}
        height={100}
        className="size-20"
      />
      <div className="flex items-center justify-between flex-col gap-2">
        <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
        <p className="text-xs text-[#8B96A5] font-medium line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default MenuItem;
