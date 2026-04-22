import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SidebarContainer from '../navbar/sidebar-container';
import SidebarNav from '../navbar/sidebar-nav';
import { PenLine, PlusCircle } from 'lucide-react';
import { ACCOUNT_NAV_ITEMS, MAIN_NAV_ITEMS } from '@/constants/navItems';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="flex h-full flex-col gap-6 sm:p-4">
        <div className="flex flex-col gap-5 pt-5">
          <Button
            variant="gradient"
            className="h-9 w-full justify-start gap-2 rounded-lg text-sm font-medium shadow-none"
            asChild
          >
            <Link href="/questions/create">
              <PlusCircle className="h-4 w-4 shrink-0" aria-hidden />
              Ask Question
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent h-9 w-full justify-start gap-2 rounded-lg text-sm font-medium"
            asChild
          >
            <Link href="/blogs/create">
              <PenLine className="h-4 w-4 shrink-0" aria-hidden />
              Write Blog
            </Link>
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 px-3 text-[11px] font-semibold tracking-wide uppercase">
            Explore
          </p>
          <SidebarNav items={MAIN_NAV_ITEMS} />
        </div>

        <div className="bg-sidebar-border h-px shrink-0" role="separator" />

        <div>
          <p className="text-muted-foreground mb-2 px-3 text-[11px] font-semibold tracking-wide uppercase">
            Account
          </p>
          <SidebarNav items={ACCOUNT_NAV_ITEMS} />
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
