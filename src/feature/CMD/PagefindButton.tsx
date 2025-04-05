import { Button } from '@/feature/ui/button';

export function PagefindButton() {
  const handleClick = () => {
    const openSearchEvent = new Event('openSearch');

    document.dispatchEvent(openSearchEvent);
  };

  return (
    <Button variant={'outline'} onClick={handleClick}>
      <span className="text-lg">⌘K</span>
    </Button>
  );
}
