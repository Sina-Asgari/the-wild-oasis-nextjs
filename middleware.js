/*
import { NextResponse } from "next/server";

export function middleware(request) {
  // redirect user
  // middleware runs for every single route. we go to /about route and there we again go /about route and so on. it create infinite loop. to stop this we need to only run middleware for certain route using matcher
  return NextResponse.redirect(new URL("/about", request.url));
}

export const config = {
  // all routes that this middleware should run
  matcher: ["/account", "/cabins"],
};
*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
