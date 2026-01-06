// Route constants for the application
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  FEATURES: '/features',
  PRICING: '/pricing',
  ABOUT: '/about',
  KAFEI_AI: '/KafeiAi',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
