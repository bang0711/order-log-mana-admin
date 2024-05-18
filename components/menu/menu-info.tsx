import React from "react";
import { Label } from "../ui/label";

type Props = {
  title: string;
  value: string;
};

function MenuInfo({ title, value }: Props) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-3`}>
      <Label className="font-bold">{title}</Label>
      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
        {value}
      </div>
    </div>
  );
}

export default MenuInfo;
