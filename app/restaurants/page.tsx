import Header from "@/components/header";
import Pagination from "@/components/pagination";
import RestaurantsTable from "@/components/restaurant/restaurant-table";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {
  searchParams: {
    page: string;
    query: string;
  };
};

async function RestaurantsPage({ searchParams: { page, query } }: Props) {
  const restaurants = await prisma.shop.findMany({
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
      Brand: true,
      Item: true,
    },
  });
  const totalRestaurant = await prisma.shop.count({
    where: {
      name: {
        contains: query ? decodeURI(query) : "",
        mode: "insensitive",
      },
    },
  });
  const totalPages = Math.ceil(totalRestaurant / 10);

  return (
    <>
      <Header path="restaurants" title="Restaurants" />
      <RestaurantsTable restaurants={restaurants} />
      <Pagination
        currentPage={parseInt(page)}
        path="restaurants"
        totalPages={totalPages}
        query={query}
      />
    </>
  );
}

export default RestaurantsPage;
