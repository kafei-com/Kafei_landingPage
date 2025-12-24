import type { ReactNode } from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  title?: string;
}

// Feature component props
export interface FeatureCardProps extends BaseComponentProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

// Pricing component props
export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  highlighted?: boolean;
}

export interface PricingProps extends BaseComponentProps {
  tiers: PricingTier[];
}
