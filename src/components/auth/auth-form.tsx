"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

import { toast } from "~/hooks/use-toast";

import { Icons } from "../icons";

enum PROVIDER {
  NULL = "",
  GOOGLE = "google",
}

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<PROVIDER>(
    PROVIDER.NULL,
  );

  const login = async (provider: PROVIDER) => {
    setIsLoading(true);
    setLoadingProvider(provider);

    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: `There was an error logging with ${provider}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingProvider(PROVIDER.NULL);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <button
        onClick={() => void login(PROVIDER.GOOGLE)}
        disabled={isLoading}
        className="btn btn-primary btn-block"
      >
        {loadingProvider === PROVIDER.GOOGLE ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  );
};

export default AuthForm;
