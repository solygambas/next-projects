export { default } from "next-auth/middleware";

interface NextAuthMiddlewareConfig {
  matcher: string[];
}

export const config: NextAuthMiddlewareConfig = {
  matcher: ["/properties/add", "/properties/saved", "/profile", "/messages"],
};
