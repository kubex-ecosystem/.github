'use client';


// export function ThemeToggle() {
//   const [fallbackTheme, setFallbackTheme] = useState<'light' | 'dark'>('light');
//   const [mounted, setMounted] = useState(false);
  
//   // Try to use theme context, fallback to local state if not available
//   let theme, toggleTheme;
  
//   try {
//     const themeContext = useTheme();
//     theme = themeContext.theme;
//     toggleTheme = themeContext.toggleTheme;
//   } catch (error) {
//     // Fallback when ThemeProvider is not available
//     theme = fallbackTheme;
//     toggleTheme = () => {
//       const newTheme = fallbackTheme === 'light' ? 'dark' : 'light';
//       setFallbackTheme(newTheme);
//       localStorage.setItem('theme', newTheme);
//       document.documentElement.classList.remove('light', 'dark');
//       document.documentElement.classList.add(newTheme);
//     };
//   }

//   useEffect(() => {
//     setMounted(true);
//     const stored = localStorage.getItem('theme') as 'light' | 'dark';
//     if (stored) {
//       setFallbackTheme(stored);
//     }
//   }, []);

//   if (!mounted) {
//     return (
//       <Button variant="ghost" size="sm" className="p-2" disabled>
//         <Sun size={20} />
//       </Button>
//     );
//   }

//   return (
//     <Button
//       variant="ghost"
//       size="sm"
//       onClick={toggleTheme}
//       className="p-2"
//       aria-label="Toggle theme"
//     >
//       <motion.div
//         initial={false}
//         animate={{ rotate: theme === 'dark' ? 180 : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//       </motion.div>
//     </Button>
//   );
// }
