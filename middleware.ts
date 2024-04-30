import { auth } from "./auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_URL,
  ourOwnApiAuthRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthenticationRoute = authRoutes.includes(nextUrl.pathname);
  const isOurOwnApiAuthRoute = ourOwnApiAuthRoutes.includes(nextUrl.pathname);

  // this is an api route handler, used by next-auth, so ignore it
  if (isApiAuthRoute) {
    return;
  }

  if (isOurOwnApiAuthRoute) {
    return;
  }

  // route for user sign-in or sign-up
  if (isAuthenticationRoute) {
    // if we are already logged in, go the default page
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }
    return;
  }

  // if we are accessing any non-public url without login, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
