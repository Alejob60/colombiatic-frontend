// src/app/api/webhooks/meta/facebook/route.ts
// Facebook webhook handler for ColombiaTIC AI

import { NextRequest } from 'next/server';
import { apiClient } from '@/lib/apiClient';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    // Verify webhook signature (implementation would depend on your verification method)
    // const isValid = verifyFacebookSignature(body, signature);
    // if (!isValid) {
    //   return new Response('Unauthorized', { status: 401 });
    // }
    
    // Parse the JSON payload
    const payload = JSON.parse(body);
    
    // Process Facebook webhook events
    switch (payload.object) {
      case 'page':
        for (const entry of payload.entry) {
          const pageId = entry.id;
          const timestamp = entry.time;
          
          for (const event of entry.messaging || entry.changes || []) {
            // Send event to Misybot backend for processing
            try {
              await apiClient.post('/colombiatic/agent/facebook/event', {
                pageId,
                timestamp,
                event
              });
            } catch (error) {
              console.error('Error sending Facebook event to Misybot:', error);
            }
          }
        }
        break;
        
      case 'instagram':
        // Handle Instagram events
        for (const entry of payload.entry) {
          const instagramId = entry.id;
          const timestamp = entry.time;
          
          for (const event of entry.messaging || []) {
            // Send event to Misybot backend for processing
            try {
              await apiClient.post('/colombiatic/agent/instagram/event', {
                instagramId,
                timestamp,
                event
              });
            } catch (error) {
              console.error('Error sending Instagram event to Misybot:', error);
            }
          }
        }
        break;
        
      default:
        console.warn('Unknown Facebook webhook object:', payload.object);
    }
    
    // Return success response
    return new Response('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('Error processing Facebook webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Facebook webhook verification
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  
  // Verify token (replace with your actual verification token)
  const verifyToken = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || 'colombiatic_verify_token';
  
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Facebook webhook verified successfully');
    return new Response(challenge, { status: 200 });
  } else {
    console.log('Facebook webhook verification failed');
    return new Response('Verification failed', { status: 403 });
  }
}