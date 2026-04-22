import { Search } from 'lucide-react';
import Link from 'next/link';
import MobileNavigationButton from '../buttons/mobile-navigation-button';
import NavbarUserButton from '../buttons/navbar-user-button';
import NotificationButton from '../navbar/notification-button';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="bg-surface/85 supports-backdrop-filter:bg-surface/70 sticky top-0 z-50 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-[1800px] items-center gap-3 px-5 sm:gap-4 sm:px-8 lg:px-10 xl:px-12"
        aria-label="Main"
      >
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <MobileNavigationButton />
          <Link
            href="/"
            className="group focus-visible:ring-ring/50 focus-visible:ring-offset-background flex items-center gap-1 rounded-lg transition-opacity duration-200 outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <Image
              src="/hi-devs-logo.svg"
              alt="Hi Devs"
              width={32}
              height={32}
              className="h-10 w-10"
            />
            <span className="text-primary-foreground hidden text-xl font-semibold tracking-tight sm:inline">
              Devs
            </span>
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center px-1 md:flex">
          <label className="relative block w-full max-w-xl lg:max-w-2xl">
            <span className="sr-only">Search</span>
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 opacity-80"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search questions, blogs, jobs…"
              className="border-border/70 bg-background/70 text-foreground placeholder:text-muted-foreground/90 focus:ring-ring/40 h-9 w-full rounded-full border pr-4 pl-10 text-sm shadow-xs transition-all duration-200 placeholder:transition-opacity focus:border-transparent focus:ring-2 focus:outline-none"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <NotificationButton />
          <NavbarUserButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
