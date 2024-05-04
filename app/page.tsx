import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FcLock } from "react-icons/fc";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-sky-100 flex justify-center items-center">
      <div className={cn("text-center")}>
        <div className="flex gap-2 items-end mb-8">
          <FcLock className="w-10 h-10" />
          <h1 className="font text-3xl text-gray-800">Auth Toolkit</h1>
        </div>
        <Button className="p-9 text-2xl group rounded-full" asChild>
          <Link href={"/auth/sign-in"}>
            <h2 className="flex gap-1 items-center">
              Sign in{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <ArrowRight />
              </span>
            </h2>
          </Link>
        </Button>
      </div>
    </main>
  );
}
