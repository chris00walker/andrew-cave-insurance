import { NextRequest, NextResponse } from 'next/server';
import { clientService, communicationService } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, suffix, email, phone, contactMethod, insuranceType, preferredDate, preferredTime, additionalInfo } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !insuranceType) {
      return NextResponse.json(
        { error: 'First name, last name, email, phone number, and insurance type are required' },
        { status: 400 }
      );
    }

    // Save to Supabase database
    const client = await clientService.createFromContactForm(body);
    
    if (!client) {
      return NextResponse.json(
        { error: 'Failed to save client information' },
        { status: 500 }
      );
    }

    // Log the initial contact
    await communicationService.log({
      client_id: client.id,
      communication_type: 'email',
      direction: 'inbound',
      subject: `New Contact Form Submission - ${insuranceType}`,
      content: `Contact form submission from ${firstName} ${lastName}. Interest: ${insuranceType}. Additional info: ${additionalInfo || 'None provided'}`,
      status: 'completed'
    });

    // Construct full name for webhook
    const fullName = `${firstName} ${lastName}${suffix ? ` ${suffix}` : ''}`;

    // Prepare the data for webhook (keeping existing webhook functionality)
    const webhookData = {
      clientId: client.id, // Include the database ID
      firstName,
      lastName,
      suffix: suffix || '',
      fullName,
      email,
      phone: phone || '',
      contactMethod,
      insuranceType: insuranceType || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      additionalInfo: additionalInfo || '',
      timestamp: new Date().toISOString(),
      source: 'Andrew Cave Insurance Website'
    };

    // Send to webhook (HubSpot, Zapier, etc.) - keeping existing functionality
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        if (!webhookResponse.ok) {
          console.error('Webhook failed:', webhookResponse.statusText);
          // Continue anyway - don't fail the user request
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Continue anyway - don't fail the user request
      }
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        clientId: client.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
