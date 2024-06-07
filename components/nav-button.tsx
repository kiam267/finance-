import Link from 'next/link';
import { Button } from './ui/button';


import { cn } from '@/lib/utils';

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

function NavButton({ href, label, isActive }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn(
        'w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white transition',
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default NavButton;