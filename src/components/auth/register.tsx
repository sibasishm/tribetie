import Link from "next/link";

import { Icons } from "../icons";
import AuthForm from "./auth-form";

const Register = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a TribeTie account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <AuthForm />
      <p className="text-muted-foreground px-8 text-center text-sm">
        Already a triber?{" "}
        <Link
          href="/login"
          className="text-sm underline underline-offset-4 transition duration-300 hover:text-slate-700"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
