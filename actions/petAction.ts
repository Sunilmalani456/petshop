"use server";

import { signIn } from "@/lib/auth-edge";
import prisma from "@/lib/db";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function LoginAction(formData: unknown) {
  // check if the formData is FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // covert formData to object
  // const formDataObject = Object.fromEntries(formData.entries());

  await signIn("credentials", formData);

  redirect("/app/dashboard");
  // if (!(formData instanceof FormData)) {
  //   return {
  //     message: "Invalid form data.",
  //   };
  // }

  // console.log("formData", formData);
  // try {
  //   await signIn("credentials", formData);
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case "CredentialsSignin": {
  //         return {
  //           message: "Invalid credentials.",
  //         };
  //       }
  //       default: {
  //         return {
  //           message: "Error. Could not sign in.",
  //         };
  //       }
  //     }
  //   }

  //   throw error; // nextjs redirects throws error, so we need to rethrow it
  // }
}

export async function SignUp(formData: unknown) {
  // check if the formData is FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  const formDataEntries = Object.fromEntries(formData.entries());

  // validation check
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export const AddPet = async (petData: unknown) => {
  const Session = await checkAuth();

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
            id: Session.user?.id,
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
  const Session = await checkAuth();

  // validation check
  const validatedPet = petFormSchema.safeParse(newPetData);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

  // authorization check (user owns the pet)

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== Session.user?.id) {
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
  const Session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid Pet Data. Please provide valid",
    };
  }

  // authorization check (user owns the pet)
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== Session.user?.id) {
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
