import React from 'react';
import { useTranslations } from '../../i18n/useTranslations';

const Footer: React.FC = () => {
    const { t } = useTranslations();

    return (
        <footer className="text-center mt-12 text-slate-500 dark:text-[#90a4ae] text-xs">
            <p>{t('poweredBy')}</p>
            <p className="mt-1 font-orbitron tracking-wider">{t('motto')}</p>
        </footer>
    );
};

export default Footer;
