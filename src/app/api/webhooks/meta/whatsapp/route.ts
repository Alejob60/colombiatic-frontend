// src/app/api/webhooks/meta/whatsapp/route.ts
// WhatsApp webhook handler for ColombiaTIC AI

import { NextRequest } from 'next/server';
import { apiClient } from '@/lib/apiClient';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    // Parse the JSON payload
    const payload = JSON.parse(body);
    
    // Process WhatsApp webhook events
    if (payload.entry) {
      for (const entry of payload.entry) {
        const phoneNumberId = entry.changes?.[0]?.value?.metadata?.phone_number_id;
        const timestamp = entry.changes?.[0]?.value?.timestamp;
        
        // Process messages
        if (entry.changes?.[0]?.value?.messages) {
          for (const message of entry.changes[0].value.messages) {
            // Send message to Misybot backend for processing
            try {
              await apiClient.post('/colombiatic/agent/whatsapp/message', {
                phoneNumberId,
                timestamp,
                message
              });
            } catch (error) {
              console.error('Error sending WhatsApp message to Misybot:', error);
            }
          }
        }
        
        // Process message statuses
        if (entry.changes?.[0]?.value?.statuses) {
          for (const status of entry.changes[0].value.statuses) {
            // Send status to Misybot backend for processing
            try {
              await apiClient.post('/colombiatic/agent/whatsapp/status', {
                phoneNumberId,
                timestamp,
                status
              });
            } catch (error) {
              console.error('Error sending WhatsApp status to Misybot:', error);
            }
          }
        }
      }
    }
    
    // Return success response
    return new Response('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // WhatsApp webhook verification
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  
  // Verify token (replace with your actual verification token)
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'colombiatic_whatsapp_verify_token';
  
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WhatsApp webhook verified successfully');
    return new Response(challenge, { status: 200 });
  } else {
    console.log('WhatsApp webhook verification failed');
    return new Response('Verification failed', { status: 403 });
  }
}