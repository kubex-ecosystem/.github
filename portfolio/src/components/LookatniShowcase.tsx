'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';

export const LookatniShowcase = () => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full relative z-10 scroll-m-24 my-16" id="lookatni-showcase">
            <div className="flex flex-col items-center mb-8 text-center max-w-3xl mx-auto">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                >
                    {t('showcase.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-xl"
                >
                    {t('showcase.subtitle')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                >
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        size="lg"
                        variant={isOpen ? 'outline' : 'primary'}
                        className="font-mono flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                        {isOpen ? <ChevronUp size={16} /> : <Terminal size={16} />}
                        {isOpen ? t('showcase.closeEngine') : t('showcase.openEngine')}
                    </Button>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden px-2 pb-8"
                    >
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl h-[700px] lg:h-[800px] relative mt-8">
                            {isLoading && (
                                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-slate-950 z-10">
                                    <div className="w-8 h-8 border-2 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
                                    <span className="text-primary-glow/50 text-xs font-mono animate-pulse">BOOTING ENGINE...</span>
                                </div>
                            )}
                            <iframe
                                src="/lookatni-pro/index.html"
                                className="w-full h-full border-none z-0 relative"
                                title="Lookatni Pro Showcase"
                                onLoad={() => setIsLoading(false)}
                                allow="clipboard-write; clipboard-read"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
