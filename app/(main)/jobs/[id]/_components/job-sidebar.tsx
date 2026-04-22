'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/types/job';
import { Calendar, Eye, Send, UserCircle } from 'lucide-react';
import { useState } from 'react';
import ApplyModal from '@/components/apply-modal';

const JobSidebar = ({ job }: { job: Job }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <>
      <Card className="border-border bg-surface shadow-card flex flex-col gap-3 rounded-2xl border p-4">
        <Button
          variant="gradient"
          className="w-full rounded-lg"
          onClick={() => setShowApplyModal(true)}
          disabled={job.status === 'Closed'}
        >
          <Send className="mr-2 h-4 w-4 shrink-0" aria-hidden />
          {job.status === 'Open' ? 'Apply now' : 'Position closed'}
        </Button>
        <p className="text-muted-foreground text-center text-xs leading-relaxed">
          {job.status === 'Open'
            ? 'Submit your application to the employer.'
            : 'This position is no longer accepting applications.'}
        </p>
      </Card>

      <Card className="border-border bg-surface shadow-card flex flex-col gap-3 rounded-2xl border p-4">
        <h4 className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <UserCircle className="text-muted-foreground h-4 w-4" aria-hidden />
          Posted by
        </h4>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={job?.postedBy.profileImage}
              alt={job?.postedBy.username || 'User'}
            />
            <AvatarFallback className="font-bold">
              {job?.postedBy.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-foreground font-medium">{job.postedBy.name}</p>
            <p className="text-muted-foreground text-sm">
              @{job.postedBy.username}
            </p>
          </div>
        </div>
        {job.postedBy.bio && (
          <p className="text-muted-foreground text-sm">{job.postedBy.bio}</p>
        )}
      </Card>

      <Card className="border-border bg-surface shadow-card flex flex-col gap-3 rounded-2xl border p-4">
        <h4 className="text-foreground text-sm font-semibold">At a glance</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              Views
            </span>
            <span className="text-foreground font-medium tabular-nums">—</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              Listed
            </span>
            <span className="text-foreground max-w-[60%] truncate text-right font-medium">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>

      <ApplyModal
        open={showApplyModal}
        onOpenChange={() => setShowApplyModal(false)}
        jobTitle={job.title}
        jobId={job._id}
      />
    </>
  );
};

export default JobSidebar;
