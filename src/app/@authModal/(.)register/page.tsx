import React from "react";

import Register from "~/components/auth/register";
import CloseModal from "~/components/modal-close-button";

const RegisterModalPage = () => {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20">
      <div className="container mx-auto flex h-full max-w-lg items-center">
        <div className="relative h-fit w-full rounded-lg bg-base-100 px-2 py-20">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>

          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterModalPage;
