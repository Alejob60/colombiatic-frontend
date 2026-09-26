// src/services/misybot/types.ts
// Types for Misybot integration

export interface MisybotUser {
  id: string;
  name: string;
  email: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'ROLE_CLIENT_COLOMBIATIC';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface MisybotOrganization {
  id: string;
  name: string;
  plan: 'starter' | 'business' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface MisybotAuthResponse {
  success: boolean;
  user: MisybotUser;
  token: string;
  organization: MisybotOrganization;
}

export interface MisybotLoginRequest {
  email: string;
  password: string;
}

export interface MisybotRegisterRequest {
  name: string;
  email: string;
  password: string;
  organization_name?: string;
}

export interface MisybotUserProfile {
  id: string;
  name: string;
  email: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'ROLE_CLIENT_COLOMBIATIC';
  organization: MisybotOrganization;
  permissions: string[];
  branding_config: {
    primary_color: string;
    logo_url?: string;
    theme: 'light' | 'dark';
  };
}