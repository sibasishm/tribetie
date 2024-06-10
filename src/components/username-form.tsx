"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import type { User } from "~/server/db/schema";
import {
  UsernameValidator,
  type UsernameRequest,
} from "~/lib/validators/username";
import { toast } from "~/hooks/use-toast";

type UsernameFormProps = {
  currentUser: User;
};

const UsernameForm: React.FC<UsernameFormProps> = ({ currentUser }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: currentUser.username ?? "",
    },
  });

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = {
        name,
      };

      const data = await ky
        .patch("api/username", { json: payload })
        .json<string>();

      return data;
    },
    onError: (error) => {
      if (error instanceof HTTPError && error.response?.status === 409) {
        return toast({
          title: "Username already taken",
          description: "Please choose a different username",
          variant: "destructive",
        });
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Successful",
        description: "Your username has been updated.",
      });

      router.refresh();
    },
  });

  function onSubmit(data: UsernameRequest) {
    updateUser(data);
  }

  return (
    <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <div className="card-title">Your username</div>
          <p className="text-sm text-gray-400">
            Please enter a display name you are comfortable with.
          </p>
          <label className="form-control mt-4 w-full max-w-xs">
            <input
              type="text"
              placeholder="Your unique username"
              className="input input-bordered w-full max-w-xs"
              {...register("name")}
            />
            <div className="label">
              {errors?.name && (
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              )}
            </div>
          </label>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
              Change name
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UsernameForm;
