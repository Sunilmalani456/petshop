import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth-edge";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export async function checkAuth() {
  const Session = await auth();
  if (!Session?.user) {
    redirect("/login");
  }

  return Session;
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return pet;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
