'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  BookOpen,
  Briefcase,
  ClipboardList,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react';
import { useShellStore } from '@/store/shell.store';

const iconMap: Record<string, LucideIcon> = {
  Home,
  MessageSquare,
  FileText,
  BookOpen,
  Briefcase,
  ClipboardList,
  Bell,
  User,
  Settings,
};

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarNavProps {
  items: readonly SidebarNavItem[] | SidebarNavItem[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const pathname = usePathname();
  const setMobileSidebarOpen = useShellStore(s => s.setMobileSidebarOpen);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="flex flex-col gap-3" aria-label="Sidebar navigation">
      {items.map(item => {
        const active = isActive(item.href);
        const Icon = iconMap[item.icon];
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
              active
                ? 'bg-primary/10 text-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
          >
            {Icon ? (
              <Icon
                className="h-[18px] w-[18px] shrink-0 opacity-90"
                aria-hidden
              />
            ) : null}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
