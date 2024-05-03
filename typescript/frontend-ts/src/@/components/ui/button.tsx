import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-[8px] sm:text-[10px] lg:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90',
        destructive:
          'bg-red-500 text-primary-foreground shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-primary-foreground dark:hover:bg-red-900/90',
        outline:
          'border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-primary dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-primary-foreground',
        secondary:
          'bg-slate-100 text-primary shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-primary-foreground dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800 dark:hover:text-primary-foreground',
        link: 'text-primary underline-offset-4 hover:underline dark:text-primary-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-6 md:h-8 rounded-md py-0.5 px-1 md:px-3 md:py-1',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-4 w-4 md:h-6 md:w-6 xl:h-9 xl:w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
