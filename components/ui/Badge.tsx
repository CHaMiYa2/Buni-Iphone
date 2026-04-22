import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "new" | "hot" | "refurbished" | "used";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  let variantStyles = "";
  
  switch(variant) {
    case "default":
      variantStyles = "bg-[var(--color-surface)] text-[var(--color-muted)] border-[rgba(255,255,255,0.1)]";
      break;
    case "new":
      variantStyles = "bg-[var(--color-accent)] text-black border-transparent";
      break;
    case "hot":
      variantStyles = "bg-red-900/40 text-red-400 border-red-900/50";
      break;
    case "refurbished":
      variantStyles = "bg-blue-900/40 text-blue-400 border-blue-900/50";
      break;
    case "used":
      variantStyles = "bg-[var(--color-surface)] text-white border-[rgba(255,255,255,0.1)]";
      break;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider",
        variantStyles,
        className
      )}
      {...props}
    />
  );
}
