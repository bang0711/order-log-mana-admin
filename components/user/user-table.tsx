import React from "react";
import {
  TableCaption,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableHeader,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DeleteButton from "../delete-button";
import UserDetail from "./user-detail";
import { UserWithRelations } from "@/app/users/page";
type Props = {
  users: UserWithRelations[];
};

function UserTable({ users }: Props) {
  return (
    <Table className="w-full">
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">User ID</TableHead>
          <TableHead className="text-center">User</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell className="font-medium flex-col flex gap-2 items-center justify-center">
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <p>{user.name}</p>
            </TableCell>
            <TableCell>{user.phone_number}</TableCell>
            <TableCell className="flex items-center gap-2">
              <UserDetail user={user} />
              <DeleteButton id={user.id} type="user" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;
