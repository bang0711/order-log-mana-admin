import HomepageDailyInfo from "@/components/homepage/homepage-daily-info";
import HomePageIncome from "@/components/homepage/homepage-income";
import ShadowSection from "@/components/homepage/shadow-section";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {};
// Get today's date and set the time to the start of the day
const today = new Date();
today.setHours(0, 0, 0, 0);
async function HomePage({}: Props) {
  const orders = await prisma.order.findMany({
    where: {
      status: "paid",
    },
    include: {
      OrderItem: true,
    },
  });
  // Calculate total money from orders
  const total = orders.reduce((acc, order) => {
    return (
      acc +
      order.OrderItem.reduce(
        (subTotal, item) => subTotal + item.price * item.quantity,
        0
      )
    );
  }, 0);
  const totalShop = await prisma.shop.count();
  const shopToday = await prisma.shop.count({
    where: {
      created_time: {
        gte: today,
      },
    },
  });
  const orderToday = await prisma.order.count({
    where: {
      created_time: {
        gte: today,
      },
    },
  });
  const accountToDay = await prisma.user.count({
    where: {
      created_time: {
        gte: today,
      },
    },
  });
  // Get today's date and set the time to the start of the day
  const newMenu = await prisma.menu.count({
    where: {
      created_time: {
        gte: today,
      },
    },
  });
  return (
    <>
      <h1 className="text-3xl font-bold">Homepage</h1>
      <HomePageIncome newMenu={newMenu} totalShop={totalShop} total={total} />
      <HomepageDailyInfo
        account={accountToDay}
        order={orderToday}
        shop={shopToday}
      />
    </>
  );
}

export default HomePage;
