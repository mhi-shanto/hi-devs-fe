type Props = {
  children: React.ReactNode;
};

/** Shared page shell: background, max width, spacing (matches other main routes). */
export function NotificationsLayout({ children }: Props) {
  return (
    <div className="bg-background animate-fade-in min-h-screen p-4 pb-12 md:p-6 lg:p-10">
      <div className="mx-auto max-w-4xl space-y-8">{children}</div>
    </div>
  );
}
