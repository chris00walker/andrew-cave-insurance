// @ts-ignore - Deno runtime environment
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// @ts-ignore - Deno global is available in Supabase Edge Functions
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// Type definitions
interface EmailRequest {
  to: string
  subject: string
  html: string
}

interface ResendResponse {
  id?: string
  message?: string
  name?: string
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    // Validate API key
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { to, subject, html }: EmailRequest = await req.json()

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: to, subject, html' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email address format' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Attempting to send email to: ${to}`)
    console.log(`Subject: ${subject}`)

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Andrew Cave Insurance <chris00walker@gmail.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    const resendData: ResendResponse = await resendResponse.json()

    // Handle Resend API errors
    if (!resendResponse.ok) {
      console.error('Resend API error:', {
        status: resendResponse.status,
        statusText: resendResponse.statusText,
        data: resendData
      })
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Email service error: ${resendData.message || 'Unknown error'}` 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Email sent successfully:', {
      id: resendData.id,
      to: to,
      subject: subject
    })

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        id: resendData.id,
        message: 'Email sent successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Email function error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

console.log('Email Edge Function deployed and ready to receive requests')
