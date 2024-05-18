import Header from "@/components/header";
import MenuTable from "@/components/menu/menu-table";
import Pagination from "@/components/pagination";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {
  searchParams: {
    page: string;
    query: string;
  };
};

async function MenusPage({ searchParams: { page, query } }: Props) {
  const menus = await prisma.menu.findMany({
    take: 10,
    skip: (parseInt(page) - 1) * 10,
    where: {
      name: {
        contains: query ? decodeURI(query) : "",
        mode: "insensitive",
      },
    },
    orderBy: {
      created_time: "desc",
    },
    include: {
      Address: true,
      Item: true,
    },
  });
  const totalMenus = await prisma.menu.count({
    where: {
      name: {
        contains: query ? decodeURI(query) : "",
        mode: "insensitive",
      },
    },
  });
  const totalPages = Math.ceil(totalMenus / 10);
  return (
    <>
      <Header title="Menus" path="menus" />
      <MenuTable menus={menus} />
      <Pagination
        path="menus"
        currentPage={parseInt(page)}
        totalPages={totalPages}
        query={query}
      />
    </>
  );
}

export default MenusPage;
