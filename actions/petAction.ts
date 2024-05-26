"use server";

import { auth, signIn } from "@/lib/auth-edge";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function LoginAction(formData: FormData) {
  // const authData = Object.fromEntries(formData.entries());
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  console.log("formData", formData);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export async function SignUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export const AddPet = async (petData: unknown) => {
  const Session = await auth();
  if (!Session?.user) {
    redirect("/login");
  }

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
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: Session.user.id,
          },
        },
      },
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
  // authentication check
  const Session = await auth();
  if (!Session?.user) {
    redirect("/login");
  }

  // validation check
  const validatedPet = petFormSchema.safeParse(newPetData);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

  // authorization check (user owns the pet)

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== Session.user.id) {
    return {
      message: "You are not authorized to edit this pet",
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
  // authentication check
  const Session = await auth();
  if (!Session?.user) {
    redirect("/login");
  }

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

  // authorization check (user owns the pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== Session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
    };
  }

  // data mutation
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
