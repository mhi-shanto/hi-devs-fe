import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Application, ApplicationsResponse } from '@/types/application';
import { Job } from '@/types/job';
import { get } from '@/utils/methods';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Mail,
  Users,
} from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { applicationStatusBadgeClassCn } from './_lib/status-classes';

type PageProps = {
  searchParams: Promise<{ jobId?: string; page?: string }>;
};

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const { jobId, page: pageParam } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || '';

  if (!jobId) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-10 sm:py-12">
        <Card className="bg-surface border-border p-8">
          <div className="flex flex-col items-center text-center">
            <Users className="text-muted-foreground mb-4 h-12 w-12" />
            <h1 className="text-foreground text-2xl font-bold">
              Job applications
            </h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Open this page from a job you posted, or add{' '}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                ?jobId=
              </code>{' '}
              with your job&apos;s id to see all applications for that role.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link href="/jobs">Browse jobs</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  let job: Job | null = null;
  let applications: Application[] = [];
  let pagination: ApplicationsResponse['pagination'] | null = null;
  let listError: unknown = null;
  let jobError: unknown = null;

  try {
    const jobRes = await get<{ job: Job }>(`/api/jobs/${jobId}`, {
      retry: 1,
      timeout: 8000,
    });
    job = jobRes.job;
  } catch (err) {
    jobError = err;
  }

  if (!jobError && job) {
    try {
      const response = await get<ApplicationsResponse>(
        `/api/applications/job/${jobId}`,
        {
          isAuthenticated: true,
          token,
          params: { page, limit: 10 },
        },
      );
      applications = response.applications ?? [];
      pagination = response.pagination ?? null;
    } catch (err) {
      listError = err;
    }
  }

  if (jobError || !job) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-foreground mb-2 text-2xl font-bold">
          Job not found
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          {jobError != null ? String(jobError) : 'Unable to load this job.'}
        </p>
        <Button variant="outline" asChild>
          <Link href="/jobs">Back to jobs</Link>
        </Button>
      </div>
    );
  }

  if (listError) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link href={`/jobs/${jobId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to job
            </Link>
          </Button>
          <h1 className="text-foreground text-2xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4" />
            {job.company}
          </p>
        </div>
        <Card className="bg-surface border-border p-8">
          <p className="text-muted-foreground text-sm">
            Applications could not be loaded. You must be signed in as the job
            owner to view applicants for this posting.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            {String(listError)}
          </p>
        </Card>
      </div>
    );
  }

  const listQuery = (p: number) =>
    `/applications?jobId=${encodeURIComponent(jobId)}&page=${p}`;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href={`/jobs/${jobId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to job
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-foreground text-3xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 shrink-0" />
              <span>{job.company}</span>
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 font-normal">
            {pagination != null
              ? `${pagination.totalItems} total`
              : `${applications.length} ${applications.length === 1 ? 'application' : 'applications'}`}
          </Badge>
        </div>
      </div>

      {applications.length === 0 ? (
        <Card className="bg-surface border-border p-10">
          <p className="text-muted-foreground text-center text-sm">
            No applications yet for this job.
          </p>
        </Card>
      ) : (
        <>
          <ul className="list-none space-y-4 p-0">
            {applications.map(app => {
              const applicant = app.applicantId;
              const name =
                applicant?.name?.trim() ||
                applicant?.username ||
                applicant?.email ||
                'Applicant';
              const initial = name.charAt(0).toUpperCase();
              const appliedAgo = formatDistanceToNow(new Date(app.createdAt), {
                addSuffix: true,
              });

              return (
                <li key={app._id}>
                  <Card className="bg-surface border-border p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                            aria-hidden
                          >
                            <span className="text-primary text-sm font-semibold">
                              {initial}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground font-medium">
                              {name}
                            </p>
                            {applicant?.email && (
                              <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">
                                  {applicant.email}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        {app.coverLetter && (
                          <p className="text-foreground/90 line-clamp-2 text-sm leading-relaxed">
                            {app.coverLetter}
                          </p>
                        )}
                        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            Applied {appliedAgo}
                          </span>
                          <Badge
                            className={applicationStatusBadgeClassCn(
                              app.status,
                            )}
                          >
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                        {app.resumeUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="h-4 w-4" />
                              Resume
                            </a>
                          </Button>
                        )}
                        <Button variant="gradient" size="sm" asChild>
                          <Link href={`/applications/${app._id}`}>
                            View details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <p className="text-muted-foreground text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                {pagination.hasPrevPage ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={listQuery(pagination.currentPage - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}
                {pagination.hasNextPage ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={listQuery(pagination.currentPage + 1)}>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
