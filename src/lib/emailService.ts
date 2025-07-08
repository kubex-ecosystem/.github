import emailjs from '@emailjs/browser';
import { ContactForm } from '../types';

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const emailConfig: EmailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

export const emailService = {
  async sendContactForm(formData: ContactForm): Promise<{ success: boolean; message: string }> {
    try {
      if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Rafael Mori',
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again or contact me directly.',
      };
    }
  },

  validateForm(formData: ContactForm): { isValid: boolean; errors: Partial<ContactForm> } {
    const errors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

