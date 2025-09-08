'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '../../components/ui';
import { ContactForm } from '../../types';
import { emailService } from '../../lib/emailService';
import { personalInfo } from '../../data/personal';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../../lib/animations';
import { useLanguage } from '../../context/LanguageContext';

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
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: '@faelmori',
      href: personalInfo.social.github,
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'Rafael Mori',
      href: personalInfo.social.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.getInTouch')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('contact.description')}
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      target={info.href?.startsWith('http') ? '_blank' : undefined}
                      rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {info.label}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.quickResponse')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className={`flex items-center gap-2 p-4 rounded-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="text-sm">{submitStatus.message}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('contact.form.send')}
                      </>
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
