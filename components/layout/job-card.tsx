import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';

const JobCard = ({ job }: { job: Job }) => {
  const postedAgo = formatDistanceToNow(new Date(job.createdAt), {
    addSuffix: true,
  });

  const initials =
    job.company?.trim().length > 0
      ? job.company
          .split(/\s+/)
          .filter(Boolean)
          .map(w => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : '';

  return (
    <article className="border-border bg-surface shadow-card hover:border-primary/30 hover:shadow-elevated animate-slide-up rounded-2xl border p-4 transition-all sm:p-5">
      <div className="flex gap-4">
        <div
          className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
          aria-hidden
        >
          {initials ? (
            initials
          ) : (
            <Building2 className="h-6 w-6" strokeWidth={1.75} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/jobs/${job._id}`}
                className="text-foreground hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
              >
                {job.title}
              </Link>
              <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
                <Building2
                  className="h-3.5 w-3.5 shrink-0 opacity-80"
                  aria-hidden
                />
                <span className="truncate">{job.company}</span>
              </p>
            </div>
            {job.status && (
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
            )}
          </div>

          <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="bg-muted/60 inline-flex items-center gap-1 rounded-md px-2 py-0.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {job.location}
            </span>
            <span className="bg-muted/60 inline-flex items-center gap-1 rounded-md px-2 py-0.5">
              <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {job.employmentType}
            </span>
            {job.salaryRange ? (
              <span className="text-foreground inline-flex items-center gap-1 font-medium">
                <Wallet
                  className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                {job.salaryRange}
              </span>
            ) : null}
          </div>

          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.requiredSkills.slice(0, 4).map((skill: string) => (
                <Badge key={skill} variant="outline" className="font-normal">
                  {skill}
                </Badge>
              ))}
              {job.requiredSkills.length > 4 && (
                <Badge variant="secondary" className="font-normal">
                  +{job.requiredSkills.length - 4}
                </Badge>
              )}
            </div>
          )}

          <div className="border-border mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs sm:text-sm">
              <Clock className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              {postedAgo}
            </span>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href={`/jobs/${job._id}`}>
                View role
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
