import { UserRoundPlus, Home, ScrollText } from "lucide-react";
import React from "react";
import ShadowSection from "./shadow-section";

type Props = {
  account: number;
  shop: number;
  order: number;
};

function HomepageDailyInfo({ account, order, shop }: Props) {
  const figures = [
    {
      title: "Daily Signups",
      value: account,
      icon: UserRoundPlus,
    },
    {
      title: "Daily Shops",
      value: shop,
      icon: Home,
    },
    {
      title: "Daily Order",
      value: order,
      icon: ScrollText,
      bg: "bg-primary",
      type: "number",
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {figures.map((fig) => (
        <ShadowSection
          key={fig.title}
          className="flex items-center justify-between w-full"
        >
          <div className="font-semibold">
            <p>{fig.value}</p>
            <p>{fig.title}</p>
          </div>

          <div className={`p-3 size-16 text-white rounded-lg bg-primary`}>
            <fig.icon className="w-full h-full" />
          </div>
        </ShadowSection>
      ))}
    </div>
  );
}

export default HomepageDailyInfo;
