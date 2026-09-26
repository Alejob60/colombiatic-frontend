// src/app/api/wompi/webhook/route.ts
import { NextRequest } from 'next/server';
import wompiService from '@/services/wompi.service';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('authorization');
    
    // Parse the JSON body for processing
    const payload = JSON.parse(body);
    
    console.log('Wompi webhook received:', payload);
    
    // Handle the webhook event
    const result = await wompiService.handleWebhook(payload);
    
    if (result) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Failed to process webhook' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error processing Wompi webhook:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Disable body parsing for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};