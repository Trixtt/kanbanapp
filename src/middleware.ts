import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Definisikan rute yang boleh dibuka tanpa login
const isPublicRoute = createRouteMatcher([
  '/',
  '/share/(.*)', // Ini kunci agar link share Akun A bisa dibuka Akun B
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. Jika rute TIDAK publik, maka lindungi dengan login
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};