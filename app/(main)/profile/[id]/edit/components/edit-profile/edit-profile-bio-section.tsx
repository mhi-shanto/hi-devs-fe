'use client';

import { useFormContext } from 'react-hook-form';
import { AlignLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { UserFormData } from '@/schemas/user.schema';
import { EDIT_FIELD_CLASS } from './constants';
import { EditSectionTitle } from './section-title';

export function EditProfileBioSection() {
  const { register, watch } = useFormContext<UserFormData>();
  const bio = watch('bio');

  return (
    <section className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <EditSectionTitle
        icon={AlignLeft}
        title="Bio"
        description="Short intro visible on your profile."
      />

      <div className="space-y-2">
        <Textarea
          {...register('bio')}
          id="edit-bio"
          maxLength={500}
          className={`min-h-32 resize-none rounded-xl ${EDIT_FIELD_CLASS}`}
          placeholder="What you build, what you care about…"
        />
        <p className="text-muted-foreground text-right text-xs tabular-nums">
          {bio?.length || 0}/500
        </p>
      </div>
    </section>
  );
}
