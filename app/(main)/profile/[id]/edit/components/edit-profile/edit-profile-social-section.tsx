'use client';

import { useFormContext } from 'react-hook-form';
import { Github, Linkedin, Share2, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserFormData } from '@/schemas/user.schema';
import { EDIT_FIELD_CLASS } from './constants';
import { EditSectionTitle } from './section-title';

export function EditProfileSocialSection() {
  const { register } = useFormContext<UserFormData>();

  return (
    <section className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <EditSectionTitle
        icon={Share2}
        title="Social links"
        description="Optional links to your public profiles."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label
            htmlFor="social-twitter"
            className="text-foreground inline-flex items-center gap-2"
          >
            <Twitter className="text-muted-foreground h-4 w-4" aria-hidden />
            Twitter / X
          </Label>
          <Input
            id="social-twitter"
            {...register('socialLinks.twitter')}
            type="url"
            className={EDIT_FIELD_CLASS}
            placeholder="https://twitter.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="social-linkedin"
            className="text-foreground inline-flex items-center gap-2"
          >
            <Linkedin className="text-muted-foreground h-4 w-4" aria-hidden />
            LinkedIn
          </Label>
          <Input
            id="social-linkedin"
            {...register('socialLinks.linkedin')}
            type="url"
            className={EDIT_FIELD_CLASS}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="social-github"
            className="text-foreground inline-flex items-center gap-2"
          >
            <Github className="text-muted-foreground h-4 w-4" aria-hidden />
            GitHub
          </Label>
          <Input
            id="social-github"
            {...register('socialLinks.github')}
            type="url"
            className={EDIT_FIELD_CLASS}
            placeholder="https://github.com/username"
          />
        </div>
      </div>
    </section>
  );
}
