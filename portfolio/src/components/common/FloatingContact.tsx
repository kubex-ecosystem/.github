'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Mail, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContactSectionVisibility } from '../../hooks/useContactSectionVisibility';
import { ContactForm } from '../../types';
import { Button, Card, CardContent, Input, Textarea } from '../ui';

export function FloatingContact() {
  const { t, language } = useLanguage();
  const isInContactSection = useContactSectionVisibility();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Show floating contact after user scrolls a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400); // Show after 400px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Partial<ContactForm> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.validation.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.validation.emailRequired');
    if (!formData.subject.trim()) newErrors.subject = t('contact.validation.subjectRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.validation.messageRequired');
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus({ type: 'success', message: t('contact.floating.successMessage') });
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Auto-collapse after successful submission
      setTimeout(() => {
        setIsExpanded(false);
        setSubmitStatus({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: t('contact.floating.errorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't show floating contact if in contact section
  if (isInContactSection || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isExpanded ? (
          // Compact floating button
          <motion.div
            key="compact"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
            onHoverStart={() => setIsExpanded(true)}
          >
            <Button
              onClick={() => setIsExpanded(true)}
              className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-2 border-white dark:border-gray-800"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
            >
              {t('contact.floating.workTogether')}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 dark:border-l-gray-700 border-y-4 border-y-transparent"></div>
            </motion.div>
          </motion.div>
        ) : (
          // Expanded floating form
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80"
            onMouseLeave={() => !isSubmitting && setIsExpanded(false)}
          >
            <Card className="shadow-2xl border-2 border-blue-100 dark:border-blue-900">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('contact.quickContact')}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                  
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                  />
                  
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    required
                  />
                  
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={3}
                    required
                  />

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <motion.div
                      className={`text-xs p-2 rounded ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 mr-2" />
                        {t('contact.form.send')}
                      </>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {t('contact.floating.scrollDown')}
                    <ChevronUp className="w-3 h-3 inline ml-1" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
