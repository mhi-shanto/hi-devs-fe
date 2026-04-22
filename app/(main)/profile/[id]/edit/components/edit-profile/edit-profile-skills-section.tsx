'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Hash } from 'lucide-react';
import { EDIT_FIELD_CLASS } from './constants';
import { EditSectionTitle } from './section-title';

type Props = {
  /** Comma-separated display value, synced with form `skills` in parent */
  skillsInput: string;
  onSkillsInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function EditProfileSkillsSection({
  skillsInput,
  onSkillsInputChange,
}: Props) {
  return (
    <section className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <EditSectionTitle
        icon={Hash}
        title="Skills"
        description="Comma-separated—e.g. React, TypeScript, Node.js."
      />

      <div className="space-y-2">
        <Input
          type="text"
          value={skillsInput}
          onChange={onSkillsInputChange}
          className={EDIT_FIELD_CLASS}
          placeholder="React, TypeScript, Tailwind CSS…"
          autoComplete="off"
        />
      </div>

      {skillsInput ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {skillsInput
            .split(',')
            .map(skill => skill.trim())
            .filter(Boolean)
            .map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
        </div>
      ) : null}
    </section>
  );
}
