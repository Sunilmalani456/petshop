import { DEFAULT_PET_IMAGE } from "@/lib/constant";
import { usePetContext } from "@/lib/hooks";
import { petFormSchema, TypeForm } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "edit" | "add";
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
  // const [error, formAction] = useFormState(AddPet, {});

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   // const pet = Object.fromEntries(formData.entries());

  //   const Pet = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageUrl:
  //       (formData.get("imageUrl") as string) ||
  //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //     age: +(formData.get("age") as string),
  //     notes: formData.get("notes") as string,
  //   };

  //   if (actionType === "add") {
  //     handleAddPet(Pet);
  //   } else {
  //     handleEditPet(selectedPet!.id, Pet);
  //   }
  //   // console.log(pet);

  //   onFormSubmission();
  // };

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    },
  });

  return (
    <form
      // onSubmit={formAction}
      action={async (formData) => {
        const isValid = await trigger();

        if (!isValid) {
          toast.error("Please fill valid data in the form.");
          return;
        }
        onFormSubmission();

        // const petData = {
        //   name: formData.get("name") as string,
        //   ownerName: formData.get("ownerName") as string,
        //   imageUrl:
        //     (formData.get("imageUrl") as string) ||
        //     "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        //   age: +(formData.get("age") as string),
        //   notes: formData.get("notes") as string,
        // };

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      // onSubmit={handleSubmit}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input {...register("ownerName")} id="ownerName" />
          {errors.ownerName && (
            <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} rows={3} />
        </div>
        {errors.notes && (
          <p className="text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
};

export default PetForm;
