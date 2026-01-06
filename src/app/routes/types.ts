import type { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  guard?: 'private' | 'public';
  children?: RouteConfig[];
}

export interface RouteGroup {
  name: string;
  routes: RouteConfig[];
}
