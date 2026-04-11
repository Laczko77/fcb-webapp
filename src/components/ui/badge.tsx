import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-label text-[10px] uppercase tracking-widest px-2 py-0.5 transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#A50044] text-white',
        secondary: 'bg-[#004D98] text-white',
        accent: 'bg-[#F3C00E] text-[#131027]',
        outline: 'border border-white/20 text-[#9B97B8] bg-transparent',
        muted: 'bg-[#2E2B4A] text-[#9B97B8]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
