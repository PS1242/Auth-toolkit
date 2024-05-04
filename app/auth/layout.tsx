"use client";

import { useRouter } from "next/navigation";
import { FcLock } from "react-icons/fc";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100">
      <div
        className="flex items-end gap-2 mb-8 cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <FcLock className="w-10 h-10" />
        <h1 className="font text-3xl text-gray-800 ">Auth Toolkit</h1>
      </div>
      {children}
    </div>
  );
}
