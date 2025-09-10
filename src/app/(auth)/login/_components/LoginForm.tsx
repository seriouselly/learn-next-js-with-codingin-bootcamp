"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "@/stores";
import type { LoginRequest } from "@/interfaces";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { loginMutationKey } from "@/services";
// import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(24, { message: "Password must not exceed 24 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  rememberMe: z.boolean(),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();

  const defaultValues: LoginRequest = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const onSubmit = async ({ value }: { value: LoginRequest }) => {
    try {
      const res = await login({ value });
      toast.success("Login Successful!", {
        description: res.message,
        duration: 3000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login Failed!", {
        description: `Please check your credentials and try again.`,
        duration: 3000,
      });
      console.error(error);
      return;
    }

    // loginMutation.mutate(value);
  };

  // const loginMutation = useMutation({
  //   mutationKey: [loginMutationKey],
  //   onSuccess: (data) => {
  //     toast.success(`Login Successful!: ${data?.data?.user?.email? || user}`);
  //     router.push("/dashboard");
  //   },
  //     onError: (error) => {
  //       toast.error(`Login Failed!: ${error.message}`);
  //     },
  // });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit,
  });

  const isLoading = form.state.isSubmitting;

  return (
    <div className="w-98 h-full max-w-md px-4">
      <Card className="max-w-sm mx-auto my-9 shadow-xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="grid gap-1">
                  <Label className="text-left" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-red-500 text-sm mt-1">
                      {Array.isArray(field.state.meta.errors)
                        ? field.state.meta.errors
                            .map((error) =>
                              typeof error === "string"
                                ? error
                                : error?.message || "Unknown error",
                            )
                            .join(", ")
                        : String(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="grid gap-1">
                  <Label className="text-left" htmlFor="password">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-red-500 text-sm mt-1">
                      {Array.isArray(field.state.meta.errors)
                        ? field.state.meta.errors
                            .map((error) =>
                              typeof error === "string"
                                ? error
                                : error?.message || "Unknown error",
                            )
                            .join(", ")
                        : String(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Remember Me */}
            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.state.value}
                    onCheckedChange={(checked) => {
                      field.handleChange(!!checked);
                    }}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className={`w-full transition-all duration-300 ${
                isLoading
                  ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-blue-800 hover:cursor-pointer"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
