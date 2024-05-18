import React from "react";
import { Book, Gem, Home } from "lucide-react";
import ShadowSection from "./shadow-section";

type Props = {
  total: number;
  newMenu: number;
  totalShop: number;
};

async function HomePageIncome({ total, newMenu, totalShop }: Props) {
  const figures = [
    {
      title: "Total Menu Sale",
      value: total,
      icon: Gem,
      bg: "bg-[#00B517]",
      type: "income",
    },
    {
      title: "Total Shop",
      value: totalShop,
      icon: Home,
      bg: "bg-[#00B517]",
      type: "shop",
    },
    {
      title: "New Menu Created",
      value: newMenu,
      icon: Book,
      bg: "bg-primary",
      type: "number",
    },
  ];

  const formatValue = (value: number, type: string) => {
    if (type === "income") {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return value.toLocaleString();
  };
  return (
    <ShadowSection>
      <h1 className="text-2xl mb-5 text-primary font-bold">Mix n Munch</h1>
      <div className="space-y-2">
        <h1 className="text-lg font-bold">Latest update : 11/5/2024</h1>
        <div className="flex items-center gap-3 justify-center">
          {figures.map((figure) => (
            <div key={figure.title} className="flex items-center gap-5 w-full">
              <div className={`p-3 size-16 text-white rounded-lg ${figure.bg}`}>
                <figure.icon className="w-full h-full" />
              </div>
              <div className="space-y-3">
                <p>{figure.title}</p>
                <p className="font-semibold">
                  {figure.type === "income" && "$"}{" "}
                  {formatValue(figure.value, figure.type)}{" "}
                  {figure.type === "number" && "Menus"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShadowSection>
  );
}

export default HomePageIncome;
