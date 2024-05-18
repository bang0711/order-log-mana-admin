"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { deleteMenu, deleteShop, deleteUser } from "@/lib/action";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

type Props = {
  id: string;
  type: "user" | "shop" | "menu";
};

function DeleteButton({ id, type }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const handleSubmit = async () => {
    setIsLoading(true);
    let res;
    if (type === "shop") {
      res = await deleteShop(id);
    } else if (type === "menu") {
      res = await deleteMenu(id);
    } else {
      res = await deleteUser(id);
    }
    setIsLoading(false);
    if (res?.status === 200) {
      setIsOpen(false);
    }
    toast({
      title: res?.message,
      variant: res?.status === 200 ? "default" : "destructive",
      duration: 1000,
    });
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild className="mr-auto">
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {type} and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>{" "}
          <AlertDialogAction onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-1 font-medium">
                <Loader2 className="animate-spin" />
                Loading
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
