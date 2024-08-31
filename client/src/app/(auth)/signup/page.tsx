"use client";

import Link from "next/link";

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
import { useFormik } from "formik";
import { signupValidationSchema } from "@/validations/schema";
import { CircleAlert } from "lucide-react";
import { signUp } from "@/services/apiService";
import { useRouter } from "next/navigation";
import useNotifications from "@/lib/notification";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function SignupForm() {
  const router = useRouter();
  const { successNotification, errorNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await signUp(values);
        if (res?.success) {
          successNotification("Success", "User SignUp Successfully..!");
          resetForm();
          router.push("/signin");
          setLoading(false);
        }
      } catch (error: any) {
        errorNotification("Error", error.message);
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-[95vh]  flex flex-col justify-center items-center bg-gray-200 dark:bg-zinc-900">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  placeholder="Max"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                    <CircleAlert size={16} />
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>

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
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                    <CircleAlert size={16} />
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <div className=" flex justify-center items-center  gap-4">
                  Create an Account
                  <span>
                    {loading && (
                      <Spinner
                        className="flex items-center"
                        size="sm"
                        color="success"
                      />
                    )}
                  </span>
                </div>
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
