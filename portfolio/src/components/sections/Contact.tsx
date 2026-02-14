'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '../../components/ui';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/personal';
import { slideInLeft, slideInRight } from '../../lib/animations';
import { emailService } from '../../lib/emailService';
import { ContactForm } from '../../types';

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = emailService.validateForm(formData, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await emailService.sendContactForm(formData, language);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.location'),
      value: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location || '')}`,
      color: 'text-secondary-glow'
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-primary-glow'
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: '@faelmori',
      href: personalInfo.social.github,
      color: 'text-slate-300'
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'Rafael Mori',
      href: personalInfo.social.linkedin,
      color: 'text-tertiary-glow'
    },
  ];

  return (
    <section id="contact" className="py-24 bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="h-full border-white/10 bg-surface/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight text-white">{t('contact.getInTouch')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-slate-300 font-normal leading-relaxed">
                  {t('contact.description')}
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      target={info.href?.startsWith('http') ? '_blank' : undefined}
                      rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-surface/40 hover:border-white/20 transition-all duration-300 group"
                      whileHover={{ x: 4 }}
                    >
                      <div className={`w-10 h-10 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center ${info.color}`}>
                        <info.icon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5 font-bold">
                          {info.label}
                        </div>
                        <div className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Status Indicator / Quick Response */}
                <div className="mt-8 p-6 border border-primary-glow/20 bg-primary-glow/5 rounded-xl">
                  <h4 className="font-bold text-primary-glow mb-2 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-glow rounded-full animate-pulse"></span>
                    {t('contact.quickResponse')}
                  </h4>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {t('contact.quickResponseDesc')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="border-white/5 bg-surface/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">{t('contact.sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label={t('contact.form.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                    />
                    <Input
                      label={t('contact.form.email')}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                    />
                  </div>

                  <Input
                    label={t('contact.form.subject')}
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    required
                  />

                  <Textarea
                    label={t('contact.form.message')}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                    required
                  />

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <motion.div
                      className={`flex items-center gap-3 p-4 rounded-lg font-mono text-xs uppercase tracking-wider ${
                        submitStatus.type === 'success'
                          ? 'border border-secondary-glow/30 bg-secondary-glow/10 text-secondary-glow'
                          : 'border border-red-500/30 bg-red-500/10 text-red-500'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {submitStatus.type === 'success' ? (
                        <CheckCircle size={16} className="flex-shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="flex-shrink-0" />
                      )}
                      <span>{submitStatus.message}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-glow hover:bg-primary-glow/90 text-white border-none py-6 font-mono uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send size={18} />
                        {t('contact.form.send')}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
