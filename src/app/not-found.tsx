import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">CareerMatch</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex h-[calc(100vh-10rem)] items-center justify-center text-center">
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <p className="text-2xl font-medium tracking-tight text-foreground">
              Oops! Page Not Found.
            </p>
            <p className="text-muted-foreground">
              The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/">Go Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
