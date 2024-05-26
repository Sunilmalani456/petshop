import { auth } from "./lib/auth-edge";

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
