// src/components/ui/button-variants.ts
// Variantes del botón en un módulo sin "use client" para que los Server
// Components puedan usarlos directamente (no se puede invocar una función
// exportada desde un Client Component en el servidor).

import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-blue-700 shadow",
        primary: "bg-primary text-white hover:bg-blue-700 shadow",
        secondary: "bg-secondary text-white hover:bg-emerald-700",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "bg-transparent text-text hover:bg-surface",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export { buttonVariants };
