'use client';

import { useFormContext } from 'react-hook-form';
import { Camera, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import type { UserFormData } from '@/schemas/user.schema';
import { EDIT_FIELD_CLASS } from './constants';
import { EditSectionTitle } from './section-title';

export function EditProfilePhotoSection() {
  const { watch, setValue } = useFormContext<UserFormData>();
  const profileImage = watch('profileImage');

  return (
    <section className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <EditSectionTitle
        icon={Camera}
        title="Profile photo"
        description="A clear avatar helps others recognize you."
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="border-border bg-muted/30 relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed">
          {profileImage ? (
            <>
              <Image
                src={profileImage}
                alt="Profile preview"
                height={200}
                width={200}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setValue('profileImage', undefined)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute top-1 right-1 rounded-full p-1.5 shadow-sm"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <Upload className="text-muted-foreground h-6 w-6" aria-hidden />
              <p className="text-muted-foreground text-xs">No image</p>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Label className="text-muted-foreground gap-2 text-sm">
            <span>Image URL or upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={() => {}}
              className={`${EDIT_FIELD_CLASS} border-border bg-muted/30 text-muted-foreground hover:border-primary/50 file:text-foreground file:bg-primary/10 cursor-pointer border border-dashed p-3 text-xs transition-colors file:mr-2 file:rounded-md file:border-0 file:px-2 file:py-1 file:text-xs`}
            />
          </Label>
          <p className="text-muted-foreground text-xs">
            Square image, at least 400×400px recommended.
          </p>
        </div>
      </div>
    </section>
  );
}
