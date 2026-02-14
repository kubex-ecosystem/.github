import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
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
        <meta name="theme-color" content="#020617" /> 
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QK23V83HGE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QK23V83HGE');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '715746831460950');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=715746831460950&ev=PageView&noscript=1"
          />
        </noscript>

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