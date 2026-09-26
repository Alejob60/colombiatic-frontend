// src/app/api/auth-test/route.ts
import { NextResponse } from 'next/server';
import { getTokens, isAuthenticated } from '@/lib/tokenManager';

export async function GET() {
  try {
    // Check if we have tokens in localStorage
    const tokens = getTokens();
    const authStatus = isAuthenticated();
    
    return NextResponse.json({
      success: true,
      tokens,
      isAuthenticated: authStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}