import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/feature/shadcn/lib/utils';

const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      h1: 'text-2xl font-extrabold lg:text-3xl',
      h2: 'text-2xl font-semibold',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-semibold'
    }
  },
  defaultVariants: {
    variant: 'h1'
  }
});

const paragraphVariants = cva('text-base', {
  variants: {
    variant: {
      default: 'leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return <Comp className={cn(headingVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Heading.displayName = 'Heading';

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return <Comp className={cn(paragraphVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Paragraph.displayName = 'Paragraph';

export { Heading, headingVariants, Paragraph, paragraphVariants };
