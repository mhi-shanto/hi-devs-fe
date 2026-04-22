'use client';

import { useFormContext } from 'react-hook-form';
import { Globe, Mail, MapPin, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserFormData } from '@/schemas/user.schema';
import { EDIT_FIELD_CLASS } from './constants';
import { EditSectionTitle } from './section-title';

export function EditProfileBasicSection() {
  const { register } = useFormContext<UserFormData>();

  return (
    <section className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <EditSectionTitle
        icon={UserCircle}
        title="Basic information"
        description="Your name and public handle."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="edit-name" className="text-foreground">
            Full name *
          </Label>
          <Input
            id="edit-name"
            {...register('name')}
            type="text"
            className={EDIT_FIELD_CLASS}
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="edit-username" className="text-foreground">
            Username *
          </Label>
          <Input
            id="edit-username"
            {...register('username')}
            type="text"
            className={EDIT_FIELD_CLASS}
            placeholder="username"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label
            htmlFor="edit-email"
            className="text-foreground inline-flex items-center gap-2"
          >
            <Mail className="text-muted-foreground h-4 w-4" aria-hidden />
            Email
          </Label>
          <Input
            id="edit-email"
            {...register('email')}
            type="email"
            disabled
            className="border-border bg-muted/40 text-muted-foreground cursor-not-allowed rounded-xl"
          />
          <p className="text-muted-foreground text-xs">
            Email cannot be changed from this form.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label
            htmlFor="edit-location"
            className="text-foreground inline-flex items-center gap-2"
          >
            <MapPin className="text-muted-foreground h-4 w-4" aria-hidden />
            Location
          </Label>
          <Input
            id="edit-location"
            {...register('location')}
            type="text"
            className={EDIT_FIELD_CLASS}
            placeholder="City, country"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label
            htmlFor="edit-website"
            className="text-foreground inline-flex items-center gap-2"
          >
            <Globe className="text-muted-foreground h-4 w-4" aria-hidden />
            Website
          </Label>
          <Input
            id="edit-website"
            {...register('website')}
            type="url"
            className={EDIT_FIELD_CLASS}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </section>
  );
}
