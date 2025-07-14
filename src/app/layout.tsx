import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import './globals.css';

// import { metadata } from '../data/metadata';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const font = inter.variable; // Export the Inter font variable for use in styles
export const fontFamily = inter.style.fontFamily; // Export the font family for use in styles
export const fontClass = inter.className; // Export the font class for use in styles
export const fontVariable = inter.variable; // Export the font variable for use in styles
export const fontStyle = inter.style; // Export the font style for use in styles
export const fontWeight = inter.style.fontWeight; // Export the font weight for use in styles

/**
 * Root layout for the application.
 * This layout wraps the entire application and provides global styles and context providers.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {JSX.Element} The root layout component.
 */
// How to use the metadata in the layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" /> 
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || theme === 'light') {
                    document.documentElement.classList.add(theme);
                  } else {
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const defaultTheme = systemPrefersDark ? 'dark' : 'light';
                    document.documentElement.classList.add(defaultTheme);
                    localStorage.setItem('theme', defaultTheme);
                  }
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QK23V83HGE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QK23V83HGE');
          `
          }}
        />
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

// Uncomment the following code if you want to use a different structure for the RootLayout
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="pt-BR" suppressHydrationWarning>
//         <body className={inter.className}>
//             <ThemeProvider>
//               {children}
//             </ThemeProvider>
//         </body>
//     </html>
//   );
// }