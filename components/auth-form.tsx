import { LoginAction, SignUp } from "@/actions/petAction";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AuthForm = ({ type }: { type: "signUp" | "logIn" }) => {
  return (
    <form action={type === "logIn" ? LoginAction : SignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border border-zinc-400"
          id="email"
          name="email"
          type="email"
        />
      </div>

      <div className="space-y-1 mt-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border border-zinc-400"
          name="password"
          id="password"
          type="password"
        />
      </div>

      <Button className="">{type === "signUp" ? "Sign Up" : "Log In"}</Button>
    </form>
  );
};

export default AuthForm;
