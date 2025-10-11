"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  
  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    signIn: () => signIn("google"),
    signOut: () => signOut(),
    user: session?.user
  };
}