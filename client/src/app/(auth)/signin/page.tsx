"use client";

import Link from "next/link";
import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";
import { signinValidationSchema } from "@/validations/schema";
import { signIn } from "@/services/apiService";
import { useRouter } from "next/navigation";
import useNotifications from "@/lib/notification";

export default function SigninForm() {
  const router = useRouter();
  const { successNotification, errorNotification } = useNotifications();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await signIn(values);

        if (res?.success) {
          successNotification("Success", "User SignIn Successfully..!");
          resetForm();
          router.push("/dashboard");
        }
      } catch (error: any) {
        errorNotification("Error", error.message);
      }
    },
  });

  return (
    <div className="min-h-[95vh]  flex flex-col justify-center items-center bg-gray-200 dark:bg-zinc-900">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your information to log into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                    <CircleAlert size={16} />
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <CircleAlert size={16} />
                  {formik.errors.password}
                </div>
              ) : null}
              <Button type="submit" className="w-full">
                Let&apos;s In
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
