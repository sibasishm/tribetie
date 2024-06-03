"use client";

import { useRouter } from "next/navigation";

import { X } from "lucide-react";

const CloseModal = () => {
  const router = useRouter();

  return (
    <button
      className="btn btn-circle btn-secondary"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4" />
    </button>
  );
};
export default CloseModal;
