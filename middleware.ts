import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes (e.g., /tasks and its subroutes)
const isProtectedRoute = createRouteMatcher(["/tasks(.*)"]);

// Define public routes (e.g., /signin, /signup)
const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Handle root page (/)
  if (req.nextUrl.pathname === "/") {
    if (userId) {
      // If user is logged in, redirect to /tasks
      return NextResponse.redirect(new URL("/tasks", req.url));
    } else {
      // If user is not logged in, redirect to /signin
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Redirect signed-in users from /signin or /signup to /tasks
  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  // Protect /tasks route
  if (isProtectedRoute(req) && !userId) {
    // If user is not logged in, redirect to /signin
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Allow access to public routes for non-authenticated users or proceed for authenticated users
  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Run middleware on all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
