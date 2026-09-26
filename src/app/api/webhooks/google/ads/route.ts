// src/app/api/webhooks/google/ads/route.ts
// Google Ads webhook handler for ColombiaTIC AI

import { NextRequest } from 'next/server';
import { apiClient } from '@/lib/apiClient';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body
    const body = await request.text();
    
    // Parse the JSON payload
    const payload = JSON.parse(body);
    
    // Process Google Ads webhook events
    // The structure will depend on the specific Google Ads webhook configuration
    console.log('Google Ads webhook received:', payload);
    
    // Extract relevant information
    const customerId = payload.customerId;
    const timestamp = payload.timestamp || new Date().toISOString();
    const events = payload.events || payload.data || [];
    
    // Process each event
    for (const event of events) {
      // Send event to Misybot backend for processing
      try {
        await apiClient.post('/colombiatic/agent/google/ads/event', {
          customerId,
          timestamp,
          event
        });
      } catch (error) {
        console.error('Error sending Google Ads event to Misybot:', error);
      }
    }
    
    // Return success response
    return new Response('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('Error processing Google Ads webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Google Ads webhook verification or information endpoint
  return new Response(JSON.stringify({
    message: 'Google Ads webhook endpoint for ColombiaTIC AI',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}