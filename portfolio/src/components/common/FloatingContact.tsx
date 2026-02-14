'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Mail, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContactSectionVisibility } from '../../hooks/useContactSectionVisibility';
import { ContactForm } from '../../types';
import { Button, Card, CardContent, Input, Textarea } from '../ui';

export function FloatingContact() {
  const { t } = useLanguage();
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
              className="
                w-14
                h-14
                p-3 
                rounded-full 
                border-none
                bg-primary-glow 
                shadow-[0_0_20px_rgba(168,85,247,0.5)] 
                text-white
              "
            >
              <MessageCircle width={50} height={50} />
            </Button>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-surface border border-white/10 text-white text-xs font-mono uppercase tracking-widest px-3 py-2 rounded-lg whitespace-nowrap shadow-2xl"
            >
              {t('contact.floating.workTogether')}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-surface border-y-4 border-y-transparent"></div>
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
            <Card className="shadow-2xl border-primary-glow/20 bg-surface/95 backdrop-blur-xl">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 border border-primary-glow/20 bg-primary-glow/10 rounded-full flex items-center justify-center text-primary-glow">
                      <Mail size={16} />
                    </div>
                    <h3 className="font-bold tracking-tight text-white">
                      {t('contact.quickContact')}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 p-0 text-slate-500 hover:text-white"
                  >
                    <X size={16} />
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
                    className="h-9 text-xs"
                  />
                  
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    className="h-9 text-xs"
                  />
                  
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    required
                    className="h-9 text-xs"
                  />
                  
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={3}
                    required
                    className="min-h-[80px] text-xs"
                  />

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <motion.div
                      className={`text-[10px] p-2 rounded font-mono uppercase tracking-tight ${
                        submitStatus.type === 'success'
                          ? 'border border-secondary-glow/20 bg-secondary-glow/5 text-secondary-glow'
                          : 'border border-red-500/20 bg-red-500/5 text-red-500'
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
                    className="w-full bg-primary-glow hover:bg-primary-glow/90 text-white shadow-lg"
                    size="sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={14} />
                        {t('contact.form.send')}
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] font-mono text-slate-600 text-center uppercase tracking-widest">
                    {t('contact.floating.scrollDown')}
                    <ChevronUp size={10} className="inline ml-1" />
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
