// src/app/api/lead/route.ts
import { NextResponse } from 'next/server';

// POST /api/lead - Capture lead information
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real implementation, you would:
    // 1. Validate the data
    // 2. Save to database
    // 3. Send to CRM/email service
    // 4. Return success response
    
    console.log('Lead captured:', body);
    
    // For now, we'll just return a success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead captured successfully',
        data: body
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to capture lead' 
      },
      { status: 500 }
    );
  }
}