import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(text: string | undefined): string {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeSmtpPassword(raw: string): string {
  return raw
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, '');
}

function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  const host = process.env.EMAIL_HOST?.trim();
  const user = process.env.EMAIL_USER?.trim();
  const passRaw = process.env.EMAIL_PASSWORD;
  const pass = passRaw != null && passRaw !== '' ? normalizeSmtpPassword(passRaw) : '';
  const port = Number(process.env.EMAIL_PORT);

  if (!host || !user || pass === '' || !Number.isFinite(port)) {
    console.error('Contact API: missing EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, or EMAIL_PORT');
    return NextResponse.json(
      {
        success: false,
        code: 'mail_not_configured',
        message:
          'Email is not configured on the server. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASSWORD.',
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all fields.' },
        { status: 400 }
      );
    }

    if (!isLikelyEmail(String(email))) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const fromAddress = process.env.EMAIL_FROM?.trim() || user;
    const toAddress = process.env.EMAIL_TO?.trim() || user;

    const secure = port === 465 ? true : process.env.EMAIL_SECURE === 'true';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      ...(port === 587 ? { requireTLS: true } : {}),
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: `"HR Motors" <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `New Inquiry from ${name} - HR Motors`,
      text: `
        New inquiry received from contact form:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}

        Message:
        ${message}
      `,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; rounded: 10px;">
          <h2 style="color: #e11d48; margin-bottom: 20px;">New Inquiry Received</h2>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${safePhone}</p>
          </div>
          <div style="padding: 10px 0;">
            <h4 style="color: #333; margin-bottom: 10px;">Message:</h4>
            <p style="line-height: 1.6; color: #555; background: #fff; padding: 15px; border-left: 4px solid #e11d48; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            This email was sent from the HR Motors Contact Form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    const customerEmail = String(email).trim();
    const confirmationMail = {
      from: `"HR Motors" <${fromAddress}>`,
      to: customerEmail,
      replyTo: toAddress,
      subject: 'We received your inquiry — HR Motors',
      text: `Hi ${name},

Thank you for contacting HR Motors. We have received your message and will get back to you as soon as we can.

If you did not use our website contact form, you can ignore this email.

— HR Motors
`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #e11d48; margin-bottom: 16px;">Thank you, ${safeName}</h2>
          <p style="line-height: 1.6; color: #333;">We have received your inquiry and will reply shortly.</p>
          <p style="line-height: 1.6; color: #555; font-size: 14px;">If you did not contact us through our website, you can ignore this message.</p>
          <p style="margin-top: 24px; font-size: 14px; color: #999;">— HR Motors</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(confirmationMail);
    } catch (confirmErr) {
      console.error('[contact] Confirmation email to customer failed:', confirmErr);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    const detail = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        code: 'send_failed',
        message: 'Could not send email. Check SMTP settings and server logs.',
        detail: process.env.NODE_ENV === 'development' ? detail : undefined,
      },
      { status: 500 }
    );
  }
}
