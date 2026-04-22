'use client';

import { AlignLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Job } from '@/types/job';
import dynamic from 'next/dynamic';

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground py-8 text-sm">
        Loading description…
      </div>
    ),
  },
);

const JobDescription = ({ job }: { job: Job }) => {
  return (
    <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <h2 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <AlignLeft
          className="text-muted-foreground h-5 w-5 shrink-0"
          aria-hidden
        />
        Role overview
      </h2>
      <div className="prose prose-invert max-w-none">
        <MDEditorMarkdown
          source={job.description}
          style={{
            whiteSpace: 'pre-wrap',
            background: 'transparent',
          }}
        />
      </div>
    </Card>
  );
};

export default JobDescription;
