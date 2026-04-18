'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await res.json().catch(() => ({}))) as {
        message?: string;
        code?: string;
        detail?: string;
      };

      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
        return;
      }

      setStatus('error');
      if (result.code === 'mail_not_configured') {
        setErrorMessage(
          'Contact email is not configured on the server. Please call or email us directly.'
        );
        return;
      }
      const msg =
        result.message || 'There was an error sending your message. Please try again.';
      setErrorMessage(result.detail ? `${msg} (${result.detail})` : msg);
    } catch {
      setStatus('error');
      setErrorMessage('There was an error sending your message. Please try again.');
    }
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto bg-card p-8 rounded-2xl shadow-xl border border-border" 
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input required type="text" id="name" name="name" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
            <input required type="tel" id="phone" name="phone" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="+44 7700 900077" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input required type="email" id="email" name="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea required id="message" name="message" rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
        </div>
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors disabled:opacity-70"
        >
          {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
          <Send className="w-4 h-4" />
        </button>
        {status === 'success' && <p className="text-green-500 text-sm text-center mt-4">Message sent successfully! We'll be in touch soon.</p>}
        {status === 'error' && (
          <p className="text-primary text-sm text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </motion.form>
  );
}
