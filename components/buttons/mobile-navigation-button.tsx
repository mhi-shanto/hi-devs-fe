'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShellStore } from '@/store/shell.store';

const MobileNavigationButton = () => {
  const { mobileSidebarOpen, toggleMobileSidebar } = useShellStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMobileSidebar}
      className="hover:bg-accent/80 -ml-1 h-9 w-9 shrink-0 rounded-lg transition-colors duration-200 lg:hidden"
      aria-label={mobileSidebarOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={mobileSidebarOpen}
    >
      {mobileSidebarOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );
};

export default MobileNavigationButton;
