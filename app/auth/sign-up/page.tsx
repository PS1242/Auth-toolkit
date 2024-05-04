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
import { SignupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormState from "@/components/ui/form-state";
import SocialLogins from "@/components/ui/social-logins";

export default function SignUpPage() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setLoading(true);
    try {
      const resp: AxiosResponse = await axios.post("/api/sign-up", values);
      setResponse({ type: "success", message: resp?.data?.response });
    } catch (err: any) {
      setResponse({ type: "error", message: err?.response?.data?.error });
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-white w-[450px] rounded-lg shadow-sm">
      <h3 className="text-center mb-8 text-gray-700">Create Account</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
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
          <SocialLogins />
          <Button className="w-full" type="submit" disabled={loading}>
            Sign up
          </Button>
        </form>
      </Form>
      <Button
        className="font-normal w-full mt-4 "
        variant={"link"}
        size={"sm"}
        asChild
      >
        <Link href={"/auth/sign-in"}>Already have an account?</Link>
      </Button>
    </div>
  );
}
