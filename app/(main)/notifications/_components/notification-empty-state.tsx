import { BellOff } from 'lucide-react';

export function NotificationEmptyState() {
  return (
    <div
      className="border-border bg-surface shadow-card flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center sm:py-20"
      role="status"
    >
      <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl shadow-[var(--glow-primary)]">
        <BellOff className="text-primary h-8 w-8" aria-hidden />
      </div>
      <h2 className="text-foreground mt-6 text-lg font-semibold tracking-tight">
        You&apos;re all caught up
      </h2>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        No notifications yet. When someone interacts with your content or sends
        you updates, they&apos;ll show up here.
      </p>
    </div>
  );
}
