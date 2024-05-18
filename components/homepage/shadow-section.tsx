import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function ShadowSection({ children, className }: Props) {
  return (
    <div
      className={cn(
        "py-5 px-12 rounded-lg shadow-lg shadow-[#E9E9E9] border-2",
        className
      )}
    >
      <>{children}</>
    </div>
  );
}

export default ShadowSection;
