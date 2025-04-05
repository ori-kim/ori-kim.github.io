import { SOCIAL_LINKS } from '@/consts';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/feature/ui/hover-card';

export const SocialList = () => {
  return (
    <ul className="inline-flex items-center justify-center gap-2">
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <li key={name}>
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="z-50 w-auto bg-white text-sm dark:bg-dark-bg">
              <span>{name}</span>
            </HoverCardContent>
          </HoverCard>
        </li>
      ))}
    </ul>
  );
};
