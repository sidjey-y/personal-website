// This file contains type declarations to help resolve common TypeScript errors
// when working with external libraries

import * as React from 'react';

// Declare types for missing packages
declare module 'lucide-react';
declare module 'framer-motion';
declare module '@radix-ui/*';
declare module 'class-variance-authority';
declare module 'next-themes';

// Extend JSX namespace if needed
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 