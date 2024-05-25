"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const AddPet = async (petData) => {
  try {
    // await prisma.pet.create({
    //   data: {
    //     name: formData.get("name"),
    //     ownerName: formData.get("ownerName"),
    //     imageUrl:
    //       formData.get("imageUrl") ||
    //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    //     age: parseInt(formData.get("age")),
    //     notes: formData.get("notes") as string,
    //   },
    // });

    await prisma.pet.create({
      data: petData,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    // console.log(error);
    return {
      message: "Failed to add pet",
    };
  }
};

export const EditPet = async (petId, newPetData) => {
  try {
    // await prisma.pet.update({
    //   where: {
    //     id: petId,
    //   },
    //   data: {
    //     name: formData.get("name"),
    //     ownerName: formData.get("ownerName"),
    //     imageUrl:
    //       formData.get("imageUrl") ||
    //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    //     age: +(formData.get("age") as string),
    //     notes: formData.get("notes") as string,
    //   },
    // });

    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    // console.log(error);
    return {
      message: "Failed to edit pet",
    };
  }
};

export const DeletePet = async (petId) => {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }
};
