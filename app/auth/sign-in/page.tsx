"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormState from "@/components/ui/form-state";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

export default function SignInPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [response, setResponse] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    setResponse(null);
    try {
      await axios.post("/api/sign-in", values);
      router.push(DEFAULT_LOGIN_REDIRECT_URL);
    } catch (err: any) {
      setResponse({ type: "error", message: err?.response?.data?.error });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="p-8 bg-white w-[400px] rounded-lg shadow-sm">
        <h3 className="text-center mb-8  text-gray-700">Welcome back</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@gmail.com"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      type="password"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {response && (
              <FormState type={response?.type} message={response?.message} />
            )}
            <Button className="w-full" type="submit" disabled={loading}>
              Login
            </Button>
          </form>
        </Form>
        <Button
          className="font-normal w-full mt-4"
          variant={"link"}
          asChild
          size={"sm"}
        >
          <Link href={"/auth/sign-up"}>Don't have an account?</Link>
        </Button>
      </div>
    </>
  );
}
