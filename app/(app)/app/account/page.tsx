import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/h1";
import React from "react";

const Account = () => {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as ...</p>

        {/* <SignOutBtn /> */}
      </ContentBlock>
    </main>
  );
};

export default Account;
