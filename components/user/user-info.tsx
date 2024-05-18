import React from "react";

type Props = {
  title: string;
  value: string;
};

function UserInfo({ title, value }: Props) {
  return (
    <div className="flex items-center max-w-sm justify-center w-full mx-auto">
      <p className="w-32">{title}:</p>
      <div className="flex h-10 w-full overflow-hidden rounded-md max-w-xs border border-input bg-background px-3 py-2 text-sm">
        {value}
      </div>
    </div>
  );
}

export default UserInfo;
