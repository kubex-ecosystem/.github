'use client';

import { useEffect, useState } from 'react';

export function useContactSectionVisibility() {
  const [isInContactSection, setIsInContactSection] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'contact') {
            setIsInContactSection(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-50px 0px', // Add some margin to make transition smoother
      }
    );

    // Find the contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) {
        observer.unobserve(contactSection);
      }
    };
  }, []);

  return isInContactSection;
}
