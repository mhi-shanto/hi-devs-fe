'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  isSaving: boolean;
  onCancel: () => void;
};

export function EditProfileFormFooter({ isSaving, onCancel }: Props) {
  return (
    <div className="border-border flex flex-wrap items-center justify-end gap-3 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        className="rounded-lg"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="gradient"
        className="rounded-lg"
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            Saving…
          </>
        ) : (
          'Save changes'
        )}
      </Button>
    </div>
  );
}
