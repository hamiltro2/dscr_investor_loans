import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[hsl(var(--primary))]">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-[hsl(var(--foreground))]">Page Not Found</h2>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-[hsl(var(--primary)/.9)] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
