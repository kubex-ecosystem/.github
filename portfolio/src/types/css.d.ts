// Type declarations for importing CSS and SCSS files in TypeScript
// This allows side-effect imports like `import "./globals.css"` in TSX files
// without TypeScript complaining about missing module declarations.

declare module "*.css";
declare module "*.module.css";
declare module "*.scss";
declare module "*.module.scss";
declare module "*.sass";
declare module "*.module.sass";
