// src/lib/authTestUtils.ts
// Utility functions for testing authentication

import * as misybotAuth from '@/services/misybot/authService';
import * as dashboardService from '@/services/misybot/dashboardServiceV2';
import { apiClient } from '@/lib/apiClient';

export interface AuthTestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Test if the user is properly authenticated
 */
export async function testAuthentication(): Promise<AuthTestResult> {
  try {
    console.log('Testing authentication...');
    
    // Test getting current user
    const currentUser = await misybotAuth.getCurrentUser();
    console.log('Current user test passed:', currentUser);
    
    return {
      success: true,
      message: 'Authentication test passed',
      data: { currentUser }
    };
  } catch (error: any) {
    console.error('Authentication test failed:', error);
    
    return {
      success: false,
      message: 'Authentication test failed',
      error: error.message || 'Unknown error'
    };
  }
}

/**
 * Test if dashboard endpoints are accessible
 */
export async function testDashboardEndpoints(): Promise<AuthTestResult> {
  try {
    console.log('Testing dashboard endpoints...');
    
    // Test getting dashboard summary
    const dashboardData = await dashboardService.getDashboardSummary();
    console.log('Dashboard summary test passed:', dashboardData);
    
    return {
      success: true,
      message: 'Dashboard endpoints test passed',
      data: { dashboardData }
    };
  } catch (error: any) {
    console.error('Dashboard endpoints test failed:', error);
    
    return {
      success: false,
      message: 'Dashboard endpoints test failed',
      error: error.message || 'Unknown error'
    };
  }
}

/**
 * Test if cookies are properly set and sent
 */
export async function testCookies(): Promise<AuthTestResult> {
  try {
    console.log('Testing cookies...');
    
    // Get current cookies
    const cookies = document.cookie;
    console.log('Current cookies:', cookies);
    
    // Test getting current user (this should send cookies)
    const currentUser = await misybotAuth.getCurrentUser();
    console.log('Current user with cookies:', currentUser);
    
    return {
      success: true,
      message: 'Cookies test passed',
      data: { cookies, currentUser }
    };
  } catch (error: any) {
    console.error('Cookies test failed:', error);
    
    return {
      success: false,
      message: 'Cookies test failed',
      error: error.message || 'Unknown error'
    };
  }
}

/**
 * Run all authentication tests
 */
export async function runAllAuthTests(): Promise<AuthTestResult[]> {
  const tests = [
    testAuthentication,
    testDashboardEndpoints,
    testCookies
  ];
  
  const results: AuthTestResult[] = [];
  
  for (const test of tests) {
    try {
      const result = await test();
      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        message: 'Test execution failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return results;
}

/**
 * Test a specific API endpoint
 */
export async function testApiEndpoint(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<AuthTestResult> {
  try {
    console.log(`Testing API endpoint: ${method} ${endpoint}`);
    
    let response;
    switch (method) {
      case 'GET':
        response = await apiClient.get(endpoint);
        break;
      case 'POST':
        response = await apiClient.post(endpoint, data);
        break;
      case 'PUT':
        response = await apiClient.put(endpoint, data);
        break;
      case 'DELETE':
        response = await apiClient.delete(endpoint);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    console.log(`API endpoint test passed: ${method} ${endpoint}`, response.data);
    
    return {
      success: true,
      message: `API endpoint test passed: ${method} ${endpoint}`,
      data: response.data
    };
  } catch (error: any) {
    console.error(`API endpoint test failed: ${method} ${endpoint}`, error);
    
    return {
      success: false,
      message: `API endpoint test failed: ${method} ${endpoint}`,
      error: error.message || 'Unknown error'
    };
  }
}

export default {
  testAuthentication,
  testDashboardEndpoints,
  testCookies,
  runAllAuthTests,
  testApiEndpoint
};