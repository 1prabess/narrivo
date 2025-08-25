import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // check if user is logged in (true/false)

  // Route type checks
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // NextAuth API routes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // routes accessible by anyone
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); // login/register routes

  // 1. Skip NextAuth internal API routes
  if (isApiAuthRoute) return;

  // 2. If user is logged in and visits login/register → redirect them away
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
    return; // allow guests to access login/register
  }

  // 3. Protect all other routes: if not logged in → redirect to /login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

// Apply middleware to all pages & API routes, except static files/_next assets
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
