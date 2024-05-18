"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
export const deleteShop = async (id: string) => {
  const shop = await prisma.shop.findUnique({
    where: {
      id,
    },
  });
  if (!shop) {
    return { message: "Shop not found.", status: 404 };
  }
  await prisma.shop.delete({
    where: {
      id,
    },
  });
  revalidatePath("/restaurants");
  return { message: "Restaurants deleted successfully.", status: 200 };
};

export const deleteMenu = async (id: string) => {
  const menu = await prisma.menu.findUnique({
    where: {
      id,
    },
  });
  if (!menu) {
    return { message: "Menu not found.", status: 404 };
  }
  await prisma.menu.delete({
    where: {
      id,
    },
  });
  revalidatePath("/menus");
  return { message: "Menu deleted successfully.", status: 200 };
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return { message: "User not found.", status: 404 };
  }
  await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath("/users");
  return { message: "User deleted successfully.", status: 200 };
};
