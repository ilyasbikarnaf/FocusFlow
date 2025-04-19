import { clerkMiddleware } from "@clerk/nextjs/server";

// Set up Clerk middleware for the entire app
export default clerkMiddleware();

// Optional: Set up path matching to include routes you want Clerk to manage.
export const config = {
  matcher: ["/:path*"],
};
