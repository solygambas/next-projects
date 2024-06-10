"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
