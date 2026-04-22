'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useShellStore } from '@/store/shell.store';

interface SidebarContainerProps {
  children: React.ReactNode;
}

const SidebarContainer = ({ children }: SidebarContainerProps) => {
  const pathname = usePathname();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useShellStore();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  return (
    <>
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="bg-background/75 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          'border-sidebar-border bg-sidebar fixed top-14 left-0 z-50 flex h-[calc(100vh-3.5rem)] w-70 flex-col pl-5 transition-transform duration-300 ease-out lg:sticky lg:top-14 lg:z-30 lg:translate-x-0',
          mobileSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        )}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarContainer;
