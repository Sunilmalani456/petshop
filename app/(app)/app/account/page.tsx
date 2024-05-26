import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { auth, signOut } from "@/lib/auth-edge";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const Account = async () => {
  // auth for server side rendering || useSession for client side rendering

  const Session = await auth();

  if (!Session?.user) {
    redirect("/login");
  }

  async function LogOut() {
    "use server";

    await signOut({ redirectTo: "/" });
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {Session.user.email}</p>
        <SignOutBtn LogOut={LogOut} />
      </ContentBlock>
    </main>
  );
};

export default Account;
