import { AlertTriangle } from 'lucide-react';

export function NotificationErrorState() {
  return (
    <div
      className="border-border bg-surface shadow-card flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center sm:py-20"
      role="alert"
    >
      <div className="bg-destructive/15 flex h-16 w-16 items-center justify-center rounded-2xl">
        <AlertTriangle className="text-destructive h-8 w-8" aria-hidden />
      </div>
      <h2 className="text-foreground mt-6 text-lg font-semibold tracking-tight">
        Couldn&apos;t load notifications
      </h2>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        Something went wrong. Refresh the page or try again in a moment.
      </p>
    </div>
  );
}
