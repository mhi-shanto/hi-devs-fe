import Link from 'next/link';
import { ArrowLeft, PenSquare } from 'lucide-react';

export function EditProfilePageHeader() {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <Link
          href="/profile"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to profile
        </Link>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <PenSquare
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Account
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Edit profile
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
            Update how you appear across hi-devs—photo, bio, skills, and links.
          </p>
        </div>
      </header>
    </>
  );
}
