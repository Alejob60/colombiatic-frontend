// src/app/api/orders/create/route.ts
import { NextRequest } from 'next/server';
import wompiService from '@/services/wompi.service';
import { getServiceById } from '@/services/serviceCatalog';

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you would validate the session against the
    // auth provider configured in @/lib/auth and reject unauthenticated calls.

    const body = await request.json();
    const { userId, moduleId } = body;

    // Validate required fields
    if (!userId || !moduleId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: userId, moduleId' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Find the service in our data
    const service = getServiceById(moduleId);
    
    if (!service) {
      return new Response(JSON.stringify({ error: 'Service not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Calculate amount
    const amount = wompiService.calculateAmount(service);

    // Create order with Wompi
    const orderResponse = await wompiService.createOrder({
      userId,
      moduleId,
      amount,
      currency: 'COP',
      callbackUrl: `${request.nextUrl.origin}/dashboard/wompi/callback`
    });

    // In a real implementation, you would save the order to your database here
    // await saveOrderToDatabase({
    //   userId,
    //   moduleId,
    //   amount,
    //   wompiOrderId: orderResponse.orderId,
    //   status: 'pending'
    // });

    return new Response(JSON.stringify({
      success: true,
      checkoutUrl: orderResponse.checkoutUrl,
      orderId: orderResponse.orderId,
      status: orderResponse.status
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}