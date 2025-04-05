import { cn } from '@/lib/utils';

const isUrlString = (str?: string | null) => {
  return /^(http|https):\/\//.test(str || '') || str?.startsWith('/');
};

const EmojiVariant = {
  size: {
    sm: 'h-8 w-8 text-xl',
    md: 'h-12 w-12 text-2xl',
    lg: 'h-16 w-16 text-3xl',
    xl: 'h-20 w-20 text-4xl'
  }
} as const;

export const Emoji = ({ data, size = 'sm' }: { data: string; size?: keyof (typeof EmojiVariant)['size'] }) => {
  return (
    <div
      className={cn(
        'flex transform items-center justify-center overflow-hidden rounded-full bg-zinc-100 shadow-md',
        EmojiVariant.size[size]
      )}
    >
      {!isUrlString(data) ? <span>{data}</span> : <img src={data} alt={data} className="h-15 w-16 rounded-full" />}
    </div>
  );
};
