import { Slot } from '@radix-ui/react-slot';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
  asChild?: true;
}

export const AnimatedCounter = ({ end, duration = 2000, className, asChild }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      const value = Math.floor(percentage * end);

      if (countRef.current !== value) {
        countRef.current = value;
        setCount(value);
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTimeRef.current = null;
    };
  }, [end, duration]);

  const Element = asChild ? Slot : 'span';

  return <Element className={cn(className)}>{count.toLocaleString()}</Element>;
};
