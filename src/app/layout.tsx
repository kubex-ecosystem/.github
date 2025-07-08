import React from 'react';
import { Inter } from 'next/font/google';
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
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
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