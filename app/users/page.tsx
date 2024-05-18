import Header from "@/components/header";
import Pagination from "@/components/pagination";
import UserTable from "@/components/user/user-table";
import prisma from "@/lib/prisma";
import { Address, Item, Menu, User } from "@prisma/client";
import React from "react";

type Props = {
  searchParams: {
    page: string;
    query: string;
  };
};
export type UserWithRelations = User & {
  Address: Address[];
  Menu_Menu_user_idToUser: (Menu & {
    Item: Item[];
    Address: Address | null;
  })[];
};
async function UsersPage({ searchParams: { page, query } }: Props) {
  const users: UserWithRelations[] = await prisma.user.findMany({
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
      Menu_Menu_user_idToUser: {
        include: {
          Item: true,
          Address: true,
        },
      },
    },
  });
  const totalUser = await prisma.user.count({
    where: {
      name: {
        contains: query ? decodeURI(query) : "",
        mode: "insensitive",
      },
    },
  });
  const totalPages = Math.ceil(totalUser / 10);
  return (
    <>
      <Header path="users" title="Users" />
      <UserTable users={users} />
      <Pagination
        currentPage={parseInt(page)}
        path="users"
        query={query}
        totalPages={totalPages}
      />
    </>
  );
}

export default UsersPage;
