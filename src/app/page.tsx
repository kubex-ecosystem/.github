'use client';

import { motion } from 'framer-motion';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { About } from '../components/sections/About';
import { staggerContainer } from '../lib/animations';

// Main page component
// This is the entry point of the application, rendering the main sections of the portfolio.
// It uses Framer Motion for animations and includes the Header, Hero, About, Projects,
export default function Home() {

  // This component serves as the main page of the portfolio.
  // It imports and renders the Header, Hero, About, Projects, Skills,
  // Contact, and Footer components.
  return (
    <motion.div
      className="relative min-h-screen bg-white dark:bg-gray-900 w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </motion.div>
  );
}
