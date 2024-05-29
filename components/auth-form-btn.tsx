"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const AuthFormBtn = ({ type }: { type: "signUp" | "logIn" }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="">
      {type === "signUp" ? "Sign Up" : "Log In"}
    </Button>
  );
};

export default AuthFormBtn;
