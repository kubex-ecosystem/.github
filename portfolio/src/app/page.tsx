import { FloatingContact } from "../components/common/FloatingContact";
import { ClientPageLayout } from "../components/layout/ClientPageLayout";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { DevLogFeed } from "../components/sections/DevLogFeed";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";

// Main page component
// This is the entry point of the application, rendering the main sections of the portfolio.
// It uses a ClientPageLayout for animations while keeping the root as a Server Component.
export default function Home() {
  return (
    <ClientPageLayout>
      <Header />
      <Hero />
      <About />
      <DevLogFeed />
      <Projects />
      <Contact />
      <Footer />
      <FloatingContact />
    </ClientPageLayout>
  );
}
