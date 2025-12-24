// Route constants for the application
export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  WISHLIST: '/wishlist',
  KAFEI_AI: '/kafei-ai',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
