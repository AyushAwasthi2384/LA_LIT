"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button
            className="flex w-full items-center justify-center gap-3 bg-white text-black hover:bg-gray-100"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}