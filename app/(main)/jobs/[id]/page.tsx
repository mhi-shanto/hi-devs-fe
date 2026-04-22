import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { get } from '@/utils/methods';
import { Job } from '@/types/job';
import JobHeader from './_components/job-header';
import JobDescription from './_components/job-description';
import JobSidebar from './_components/job-sidebar';
import JobApplications from './_components/job-applications';
import { Suspense } from 'react';

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let job: Job | null = null;
  let error = null;
  try {
    const response = await get<{ job: Job }>(`/api/jobs/${id}`, {
      retry: 2,
      timeout: 5000,
    });
    job = response.job;
  } catch (err) {
    error = err;
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 p-4 py-12 text-center lg:p-6">
        <p className="text-destructive text-sm font-medium">
          Unable to load this job
        </p>
        <p className="text-muted-foreground text-sm">
          It may have been removed, or something went wrong. Please try again
          later.
        </p>
        <Link
          href="/jobs"
          className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
        >
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 pb-12 lg:p-6">
      <nav aria-label="Breadcrumb">
        <Link
          href="/jobs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to jobs
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <JobHeader job={job} />
          <JobDescription job={job} />
          <Suspense
            fallback={
              <div className="border-border bg-surface text-muted-foreground flex items-center gap-2 rounded-2xl border px-5 py-8 text-sm">
                <Loader2
                  className="h-4 w-4 shrink-0 animate-spin"
                  aria-hidden
                />
                Loading applications…
              </div>
            }
          >
            <JobApplications jobId={id} />
          </Suspense>
        </div>

        <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <JobSidebar job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
