import { SITE } from '@/consts';
import { PagefindButton } from '@/feature/CMD/PagefindButton';
import { Emoji } from '@/feature/components/Emoji';
import { cn } from '@/lib/utils';

type DefaultHeaderProps = {
  title?: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
};

export const DefaultHeader = ({ ...props }: DefaultHeaderProps) => {
  return (
    <div className={cn('my-5 md:mt-24', props.className)} {...props}>
      <div className="flex items-center justify-between">
        {props.title && (
          <>
            <div className="flex items-center gap-2">
              <a href="/">
                <Emoji data={props.icon || SITE.logo} />
              </a>
              <h1 className="text-lg font-semibold">{props.title}</h1>
            </div>

            <PagefindButton />
          </>
        )}
      </div>

      {props.children}
    </div>
  );
};
