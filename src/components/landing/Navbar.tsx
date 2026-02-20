import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20 h-16 flex items-center px-6 md:px-12 justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Logo className="text-white w-6 h-6" />
        </div>
        <span className="font-headline font-bold text-xl tracking-tighter">CampusConnect</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
        <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
        <Link href="#community" className="hover:text-primary transition-colors">Community</Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6" asChild>
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    </nav>
  );
}