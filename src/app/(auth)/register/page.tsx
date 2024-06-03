import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import Register from "~/components/auth/register";

const RegisterPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <Link href="/" className="btn btn-ghost -mt-20 self-start">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <Register />
      </div>
    </div>
  );
};
export default RegisterPage;
