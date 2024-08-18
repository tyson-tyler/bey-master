import {
  authMiddleware,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

// Combine clerkMiddleware with authMiddleware
export default clerkMiddleware((auth, req) => {
  // Protect the route if it's a protected route
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

// Define public routes separately using authMiddleware
export const publicAuthMiddleware = authMiddleware({
  publicRoutes: ["/app/api/webhooks/clerk"], // Specify public routes here
});

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // Protect /dashboard and its subroutes
  "!/dashboard/setting(.*)", // Exclude /dashboard/setting and its children
]);

// Export the middleware config
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all routes except static files and _next
    "/", // Match the root route
    "/(api|trpc)(.*)", // Match API routes
  ],
};

// Export both middlewares for use
export const middleware = [clerkMiddleware, publicAuthMiddleware];
