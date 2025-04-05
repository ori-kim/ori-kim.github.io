import { SITE } from '@/consts';

export const Header = () => {
  return (
    <header className="mx-auto flex h-6 max-w-2xl px-2 md:px-0">
      <h1 className="text-lg font-bold">{SITE.title}</h1>
    </header>
  );
};
