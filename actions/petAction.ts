"use server";

import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export const AddPet = async (petData: unknown) => {
  const validatedPet = petFormSchema.safeParse(petData);

  if (!validatedPet.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

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
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    // console.log(error);
    return {
      message: "Failed to add pet",
    };
  }
};

export const EditPet = async (petId: unknown, newPetData: unknown) => {
  const validatedPet = petFormSchema.safeParse(newPetData);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

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
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    // console.log(error);
    return {
      message: "Failed to edit pet",
    };
  }
};

export const DeletePet = async (petId: unknown) => {
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }
};
