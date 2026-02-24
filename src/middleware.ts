import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/dashboard', '/share(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Gunakan await di sini agar tidak merah
  const authObject = await auth();

  if (!isPublicRoute(req)) {
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};