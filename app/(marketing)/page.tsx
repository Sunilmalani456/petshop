import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// dark:[^ "]+ -> replace with dark classes to ""

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-14 max-sm:p-3">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        width={519}
        height={472}
        alt="Petsoft Preview"
      />

      <div className="max-sm:px-2">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage Your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>

        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>

        <div className="mt-10 space-x-3">
          <Button asChild className="rounded-full">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button className="rounded-full" variant="secondary" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
