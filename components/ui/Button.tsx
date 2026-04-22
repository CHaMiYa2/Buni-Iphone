import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Pure tailwind approach
    let variantStyles = "";
    let sizeStyles = "";
    
    switch(variant) {
      case "primary":
        variantStyles = "bg-[var(--color-accent)] text-black hover:bg-white border border-transparent";
        break;
      case "secondary":
        variantStyles = "bg-[var(--color-surface)] text-white hover:bg-[var(--color-surface-hover)] border border-transparent";
        break;
      case "outline":
        variantStyles = "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black bg-transparent";
        break;
      case "ghost":
        variantStyles = "hover:bg-[var(--color-surface)] text-white bg-transparent border border-transparent";
        break;
      case "link":
        variantStyles = "text-[var(--color-accent)] underline-offset-4 hover:underline border border-transparent";
        break;
    }

    switch(size) {
      case "default":
        sizeStyles = "h-11 px-6 py-2";
        break;
      case "sm":
        sizeStyles = "h-9 rounded-sm px-4 text-xs";
        break;
      case "lg":
        sizeStyles = "h-14 px-8 text-base";
        break;
      case "icon":
        sizeStyles = "h-11 w-11";
        break;
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
          variantStyles,
          sizeStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
