import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    
    // Dark theme with Gold accent mapping
    const variants = {
      default: "bg-[var(--color-gold)] text-slate-900 hover:bg-[var(--color-gold-hover)] shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all",
      outline: "border-2 border-[var(--color-gold)] bg-transparent hover:bg-[var(--color-gold)] hover:text-slate-900 text-[var(--color-gold)]",
      ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
      link: "text-[var(--color-gold)] underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
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
