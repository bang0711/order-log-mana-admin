"use client";
import {
  ChevronRight,
  ClipboardList,
  Home,
  User,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

function SideBar({}: Props) {
  const pathname = usePathname();
  const icons = [
    {
      title: "Homepage",
      href: "/",
      icon: Home,
    },
    {
      title: "Restaurant list",
      href: "/restaurants?page=1",
      icon: UtensilsCrossed,
    },
    {
      title: "Menu list",
      href: "/menus?page=1",
      icon: ClipboardList,
    },
    {
      title: "Users",
      href: "/users?page=1",
      icon: User,
    },
  ];
  return (
    <div className="min-w-80 flex flex-col items-end px-5">
      <Image
        src={"/logo.webp"}
        alt="logo"
        width={150}
        height={150}
        className="rounded-full w-36 h-auto"
        priority
      />
      <div className="space-y-3">
        <p className="text-gray-500">Dashboards</p>
        <div>
          {icons.map((icon) => (
            <Link
              className={`flex gap-1 py-2 transition-all duration-300 rounded-md font-medium ${
                pathname === icon.href && "bg-gray-500/10"
              }`}
              key={icon.title}
              href={icon.href}
            >
              {pathname === icon.href.split("?")[0] && (
                <div className="w-1 h-auto bg-black rounded-md" />
              )}

              <div className="flex items-center gap-1 pr-3 w-44">
                {pathname !== icon.href.split("?")[0] && (
                  <ChevronRight size={15} className="text-gray-300" />
                )}
                <icon.icon size={20} />
                <p className="text-sm">{icon.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
