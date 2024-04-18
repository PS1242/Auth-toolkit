import { auth } from "./auth";

export default auth((req) => {
  //req.auth
  console.log(req.nextUrl.pathname);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
