import { LoginAction, SignUp } from "@/actions/petAction";
import { useFormState } from "react-dom";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AuthForm = ({ type }: { type: "signUp" | "logIn" }) => {
  const [signUpError, dispatchSigInAction] = useFormState(SignUp, undefined);
  const [logInError, dispatchLohInAction] = useFormState(SignUp, undefined);

  return (
    <form action={type === "logIn" ? dispatchLohInAction : dispatchSigInAction}>
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
      <AuthFormBtn type={type} />

      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
};

export default AuthForm;
