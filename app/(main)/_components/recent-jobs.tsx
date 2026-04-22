import { SectionError } from '@/components/Errors';
import JobCard from '@/components/layout/job-card';
import { Job, JobsResponse } from '@/types/job';
import { get } from '@/utils/methods';
import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

const LIMIT = 3;

const RecentJobs = async () => {
  let jobs: Job[] = [];
  let error = null;

  try {
    const response = await get<JobsResponse>('/api/jobs', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    });
    jobs = (response.jobs ?? []).slice(0, LIMIT);
  } catch (err) {
    error = err;
  }

  const sectionHeader = (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <Briefcase className="text-primary h-4 w-4" aria-hidden />
        </span>
        <h2
          id="recent-jobs-heading"
          className="text-foreground text-lg font-semibold tracking-tight"
        >
          Latest jobs
        </h2>
      </div>
      <Link
        href="/jobs"
        className="text-muted-foreground hover:text-primary inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors duration-200"
      >
        View all
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );

  if (error) {
    return (
      <SectionError
        title="Latest jobs"
        message="Unable to load jobs right now. Please check back later."
      />
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <section aria-labelledby="recent-jobs-heading">
        {sectionHeader}
        <p className="text-muted-foreground text-sm">
          No jobs listed at the moment.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-jobs-heading">
      {sectionHeader}
      <div className="space-y-3">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default RecentJobs;
