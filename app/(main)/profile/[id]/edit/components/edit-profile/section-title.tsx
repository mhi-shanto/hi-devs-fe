import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export function EditSectionTitle({ icon: Icon, title, description }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Icon className="text-primary h-5 w-5 shrink-0" aria-hidden />
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
