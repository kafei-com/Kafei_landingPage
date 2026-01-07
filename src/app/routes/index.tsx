import { lazy, Suspense, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/common";
import { ROUTES } from "@/constants/routes";

// Lazy-loaded page components
const Home = lazy(() => import("@/pages/HomePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Overview = lazy(
  () => import("@/features/kafei-ai/components/KafeiAi/overview")
);
const Login = lazy(() => import("@/features/auth/components/Login"));
const Signup = lazy(() => import("@/features/auth/components/Signup"));
const Dashboard = lazy(
  () => import("@/features/kafei-ai/components/KafeiAi/dashboard/main")
);

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-white text-lg">Loading...</div>
  </div>
);

// Guard wrapper for protected routes
const withGuard = (element: ReactNode, isPrivate?: boolean): ReactNode => {
  if (isPrivate) {
    return <PrivateRoute>{element}</PrivateRoute>;
  }
  return element;
};

// Router component that renders all routes
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<Home />} />
      <Route path={ROUTES.FEATURES} element={<Home />} />
      <Route path={ROUTES.PRICING} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<AboutUs />} />
      <Route path={ROUTES.KAFEI_AI} element={<Overview />} />

      {/* Auth routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />

      {/* Protected routes */}
      <Route path={ROUTES.DASHBOARD} element={withGuard(<Dashboard />, true)} />

      {/* 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
