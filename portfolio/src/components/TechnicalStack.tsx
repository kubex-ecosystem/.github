'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills, skillCategories } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';

export function TechnicalStack() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  // Filter skills by level >= 4
  const seniorSkills = skills
    .filter((skill) => (skill.level || 0) >= 4)
    .sort((a, b) => (b.level || 0) - (a.level || 0)); // sort by level descending (master first)

  const getLevelDisplay = (level: number) => {
    if (level === 5) return { bars: '█████', text: 'MASTER' };
    if (level === 4) return { bars: '████░', text: 'EXPERT' };
    return { bars: '████░', text: 'EXPERT' };
  };

  const getCategoryLabel = (catId: string) => {
    const cat = skillCategories.find(c => c.id === catId);
    if (!cat) return catId.toUpperCase();

    // In technical terminal context, short English names look best, but we'll respect localization if provided by the category label.
    // skillCategories currently returns English or mixed label (e.g., 'Languages').
    let label = cat.label.toUpperCase();
    if (isPt) {
      if (catId === 'language') label = 'LINGUAGEM';
      else if (catId === 'framework') label = 'FRAMEWORK';
      else if (catId === 'tool') label = 'FERRAMENTA';
      else if (catId === 'database') label = 'DATABASE';
      else if (catId === 'cloud') label = 'CLOUD/DEVOPS';
    } else {
      if (catId === 'language') label = 'LANGUAGE';
      else if (catId === 'framework') label = 'FRAMEWORK';
      else if (catId === 'tool') label = 'TOOL';
      else if (catId === 'database') label = 'DATABASE';
      else if (catId === 'cloud') label = 'CLOUD/DEVOPS';
    }
    return label;
  };

  return (
    <div className="w-full bg-[#000000] text-[#00FF41] border border-[#00FF41]/30 p-4 md:p-8 rounded-lg relative overflow-hidden font-mono shadow-[0_0_20px_rgba(0,255,65,0.15)]">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0)_50%,rgba(0,255,65,0.05)_50%)] bg-[length:100%_4px] opacity-40 z-0"></div>

      {/* Inner glow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] z-0"></div>

      {/* Terminal Header */}
      <div className="mb-8 border-b border-[#00FF41]/40 pb-4 relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#00FF41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
            {'>'} SYSTEM_DIAGNOSTIC_REPORT
          </h3>
          <p className="text-sm opacity-80 mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FF41] animate-pulse inline-block"></span>
            Executing TechStack_Scan.sh --filter "Senior_Only"
          </p>
        </div>
        <div className="text-xs opacity-60 uppercase text-right">
          STATUS: <span className="text-[#00FF41] font-bold">ONLINE</span><br/>
          {new Date().toISOString().substring(0, 10)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3 lg:gap-y-4 text-xs sm:text-sm md:text-base relative z-10 w-full">
        {seniorSkills.map((skill, index) => {
          const { bars, text } = getLevelDisplay(skill.level || 0);
          const catLabel = getCategoryLabel(skill.category || 'tool');
          // Ensure category is fixed width to keep alignment clean in mono font
          const formattedCat = `[ ${catLabel.padEnd(12, ' ')} ]`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex w-full items-baseline justify-between overflow-hidden px-2 py-1 -mx-2 rounded transition-colors duration-300 hover:bg-[#00FF41]/10 cursor-crosshair"
            >
              <div className="flex-none font-bold mr-2 group-hover:drop-shadow-[0_0_5px_rgba(0,255,65,1)] transition-all">
                <span className="opacity-80">{formattedCat}</span>
                <span className="ml-2 drop-shadow-[0_0_2px_rgba(0,255,65,0.5)]">{skill.name}</span>
              </div>

              <div className="flex-grow overflow-hidden opacity-30 group-hover:opacity-70 transition-opacity flex items-center mx-1">
                 <span className="truncate w-full leading-none translate-y-[-2px] tracking-widest">
                    .....................................................................................................
                 </span>
              </div>

              <div className="flex-none ml-2 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,1)] transition-all">
                <span className="opacity-80">[{bars}]</span>
                <span className="font-bold w-[65px] md:w-[75px] inline-block text-right">{text}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* End of report Footer */}
      <motion.div
        className="mt-8 border-t border-[#00FF41]/40 pt-4 text-sm opacity-80 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: seniorSkills.length * 0.05 + 0.2 }}
        viewport={{ once: true }}
      >
        <span className="animate-pulse mr-2">█</span>
        {isPt ? `scan concluído. ${seniorSkills.length} hard-skills validadas e operacionais.` : `scan complete. ${seniorSkills.length} proficiency parameters successfully loaded.`}
      </motion.div>
    </div>
  );
}
