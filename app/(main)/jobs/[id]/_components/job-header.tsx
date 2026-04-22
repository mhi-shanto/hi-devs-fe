'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Job } from '@/types/job';
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Wallet,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const JobHeader = ({ job }: { job: Job }) => {
  const postedAgo = formatDistanceToNow(new Date(job.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <Briefcase
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Job opening
              </p>
              <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {job.title}
              </h1>
              <div className="text-muted-foreground mt-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-foreground/90 font-medium">
                  {job.company}
                </span>
              </div>
            </div>
            {job.status ? (
              <Badge
                variant="secondary"
                className={
                  job.status === 'Open'
                    ? 'bg-primary/15 text-primary shrink-0 border-transparent'
                    : 'shrink-0'
                }
              >
                {job.status}
              </Badge>
            ) : null}
          </div>

          <div className="border-border flex flex-wrap items-center gap-x-3 gap-y-2 border-y py-4 text-sm">
            <span className="bg-muted/50 inline-flex items-center gap-1.5 rounded-md px-2 py-1">
              <MapPin
                className="text-muted-foreground h-4 w-4 shrink-0"
                aria-hidden
              />
              {job.location}
            </span>
            <span className="bg-muted/50 inline-flex items-center gap-1.5 rounded-md px-2 py-1">
              <Briefcase
                className="text-muted-foreground h-4 w-4 shrink-0"
                aria-hidden
              />
              {job.employmentType}
            </span>
            {job.salaryRange ? (
              <span className="text-foreground inline-flex items-center gap-1.5 font-medium">
                <Wallet
                  className="text-muted-foreground h-4 w-4 shrink-0"
                  aria-hidden
                />
                {job.salaryRange}
              </span>
            ) : null}
            {job.expiresAt ? (
              <span className="text-muted-foreground inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                Closes {new Date(job.expiresAt).toLocaleDateString()}
              </span>
            ) : null}
          </div>

          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div>
              <h2 className="text-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
                Required skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            Posted {postedAgo}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default JobHeader;
