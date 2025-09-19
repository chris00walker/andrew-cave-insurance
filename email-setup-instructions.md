# 📧 Email Notification Setup - Complete Guide

## ✅ **What's Been Implemented:**

1. **✅ Supabase Edge Function Deployed**: `send-email` function is live
2. **✅ ContactForm Updated**: Now calls the Edge Function after successful form submission
3. **✅ Professional Email Template**: HTML email with all form details
4. **✅ Error Handling**: Non-critical failure (won't break form submission)

---

## 🔧 **Required Setup Steps:**

### **Step 1: Get Resend API Key**
1. Go to [Resend.com](https://resend.com) and create a free account
2. Verify your domain or use their test domain
3. Generate an API key from the dashboard
4. Copy the API key (starts with `re_`)

### **Step 2: Configure Supabase Environment Variable**
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/osgktxnelpmandvmkiiq
2. Navigate to **Settings** → **Edge Functions**
3. Add environment variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (e.g., `re_123abc456def...`)

### **Step 3: Test the System**
1. Deploy the updated contact form
2. Submit a test form on your website
3. Check Andrew's email for the notification
4. Verify the data is still saved in Supabase

---

## 📧 **Email Template Preview:**

When someone submits the form, Andrew will receive:

```
Subject: 🔔 New Consultation Request - [Insurance Type]

┌─────────────────────────────────────┐
│        🔔 New Consultation Request   │
└─────────────────────────────────────┘

⏰ Action Required: A new client has requested 
a consultation and is waiting for your response.

Client Information:
• Name: John Doe
• Email: john@example.com
• Phone: 246-555-0123
• Preferred Contact: email

Consultation Details:
• Insurance Type: life
• Preferred Date: 2025-01-15
• Preferred Time: 10:00 AM

Additional Information:
Looking for comprehensive life insurance coverage

Next Steps:
1. Review client information above
2. Contact client within 24 hours
3. Schedule consultation meeting
4. Update client status in Supabase

Submitted: [timestamp]
Client ID: [uuid]
Andrew Cave Insurance - Automated Notification System
```

---

## 🔄 **Complete Workflow:**

```
User Clicks "Get Your Free Consultation"
           ↓
Form validates and submits to Supabase
           ↓
Client record created in database
           ↓
Communication log entry created
           ↓
Email notification sent to Andrew
           ↓
Success message shown to user
```

---

## 🚨 **Important Notes:**

1. **Free Tier Limits**: Resend free tier allows 100 emails/day, 3,000/month
2. **Domain Verification**: For production, verify andrewcaveinsurance.com domain
3. **Email Deliverability**: Professional emails have better delivery rates
4. **Backup Plan**: If email fails, data is still saved in Supabase

---

## 🔧 **Alternative Email Services:**

If you prefer a different service:
- **SendGrid**: More enterprise features
- **Mailgun**: Developer-friendly
- **Amazon SES**: Cost-effective for high volume
- **Postmark**: Excellent deliverability

---

## 📊 **Testing Checklist:**

- [ ] Resend account created and API key obtained
- [ ] RESEND_API_KEY added to Supabase Edge Functions
- [ ] Contact form deployed with updated code
- [ ] Test form submission completed
- [ ] Email received by Andrew
- [ ] Data verified in Supabase database
- [ ] Error handling tested (try with invalid API key)

---

## 🎯 **Next Steps After Setup:**

1. **Domain Verification**: Add andrewcaveinsurance.com to Resend
2. **Email Templates**: Customize the HTML template further
3. **Client Acknowledgment**: Add auto-reply to clients
4. **Analytics**: Track email open rates and clicks
5. **Calendar Integration**: Add calendar booking links to emails

---

**Status**: ✅ Code deployed, ⏳ Waiting for API key configuration
