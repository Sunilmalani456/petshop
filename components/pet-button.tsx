"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  actionType: "edit" | "checkout" | "add";
  children?: React.ReactNode;
  onClick?: () => void;
};

const PetButton = ({ actionType, onClick, children }: PetButtonProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} variant={"secondary"} size="icon">
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant={"secondary"} size="icon">
            {children}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;