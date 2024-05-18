import React from "react";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";

type Props = {
  title: string;
  path: string;
};

function Header({ title, path }: Props) {
  async function search(data: FormData) {
    "use server";
    const query = data.get("query");
    if (!query) {
      return null;
    }
    redirect(`/${path}?page=1&query=${query}`);
  }
  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <form action={search}>
        <Input placeholder="Search" name="query" className="max-w-sm" />
      </form>
    </>
  );
}

export default Header;
