import { NextRequest, NextResponse } from 'next/server';

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

    // Construct full name for display/storage
    const fullName = `${firstName} ${lastName}${suffix ? ` ${suffix}` : ''}`;

    // Prepare the data for webhook
    const webhookData = {
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

    // Send to webhook (HubSpot, Zapier, etc.)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    
    if (webhookUrl) {
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
    }

    // You could also send an email notification here
    // or save to a database if needed

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
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
