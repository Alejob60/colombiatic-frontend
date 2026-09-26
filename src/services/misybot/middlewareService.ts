// src/services/misybot/middlewareService.ts
// Middleware service for ColombiaTIC branding and permissions

import { MisybotUserProfile } from './types';

/**
 * Check if user has ColombiaTIC client role
 */
export function isColombiTICUser(user: MisybotUserProfile): boolean {
  return user.role === 'ROLE_CLIENT_COLOMBIATIC';
}

/**
 * Get branding configuration for ColombiaTIC users
 */
export function getColombiTICBranding(user: MisybotUserProfile) {
  if (!isColombiTICUser(user)) {
    return null;
  }

  return {
    primaryColor: user.branding_config?.primary_color || '#3b82f6',
    logoUrl: user.branding_config?.logo_url || '/colombiatic-logo.png',
    theme: user.branding_config?.theme || 'dark',
    organizationName: user.organization?.name || 'ColombiaTIC Client',
  };
}

/**
 * Check if user has specific permissions
 */
export function hasPermission(user: MisybotUserProfile, permission: string): boolean {
  return user.permissions?.includes(permission) || false;
}

/**
 * Get user permissions based on role
 */
export function getUserPermissions(role: string): string[] {
  const permissions: Record<string, string[]> = {
    'ROLE_CLIENT_COLOMBIATIC': [
      'view_dashboard',
      'view_analytics',
      'view_conversations',
      'view_sales_metrics',
      'create_chat_agent',
      'configure_webhook',
    ],
    'owner': [
      'view_dashboard',
      'view_analytics',
      'view_conversations',
      'view_sales_metrics',
      'create_chat_agent',
      'configure_webhook',
      'manage_users',
      'manage_billing',
      'manage_organization',
    ],
    'admin': [
      'view_dashboard',
      'view_analytics',
      'view_conversations',
      'view_sales_metrics',
      'create_chat_agent',
      'configure_webhook',
      'manage_users',
    ],
    'editor': [
      'view_dashboard',
      'view_analytics',
      'view_conversations',
      'view_sales_metrics',
      'create_chat_agent',
    ],
    'viewer': [
      'view_dashboard',
      'view_analytics',
      'view_conversations',
      'view_sales_metrics',
    ],
  };

  return permissions[role] || [];
}

export default {
  isColombiTICUser,
  getColombiTICBranding,
  hasPermission,
  getUserPermissions,
};