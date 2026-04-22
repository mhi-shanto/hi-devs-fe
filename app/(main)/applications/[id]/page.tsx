import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Application, ApplicationWithRolesResponse } from '@/types/application';
import { get } from '@/utils/methods';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Mail,
  User,
} from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ApplicationDecisionCard } from './_components/application-decision-card';
import { applicationStatusBadgeClassCn } from '../_lib/status-classes';

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || '';

  let application: Application | null = null;
  let error: unknown = null;
  let isJobOwner: boolean = false;

  try {
    const response = await get<ApplicationWithRolesResponse>(
      `/api/applications/${id}`,
      {
        isAuthenticated: true,
        token,
      },
    );
    application = response.applicationWithRoles.application;
    isJobOwner = response.applicationWithRoles.isJobOwner;
  } catch (err) {
    error = err;
  }

  if (error || !application) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-foreground mb-2 text-2xl font-bold">
          Application unavailable
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          {error != null
            ? String(error)
            : 'This application could not be loaded.'}
        </p>
        <Button variant="outline" asChild>
          <Link href="/jobs">Browse jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap gap-3">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link
            href={`/applications?jobId=${encodeURIComponent(application.jobId._id)}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All applications for job
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/jobs/${application.jobId._id}`}>
            <Briefcase className="mr-2 h-4 w-4" />
            View job posting
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              {application.jobId?.title ?? 'Application'}
            </h1>
            {application.jobId?.company && (
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <Building2 className="h-5 w-5 shrink-0" />
                <span>{application.jobId.company}</span>
              </p>
            )}
          </div>
          <Badge className={applicationStatusBadgeClassCn(application.status)}>
            {application.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-surface border-border gap-0 p-0 py-0">
          <div className="p-6">
            <h2 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <User className="h-5 w-5" />
              Applicant
            </h2>
            <div className="flex items-start gap-4">
              <div
                className="bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
                aria-hidden
              >
                {application.applicantId.name?.charAt(0)}
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-foreground text-lg font-medium">
                  {application.applicantId.name}
                </p>
                {application.applicantId?.email && (
                  <a
                    href={`mailto:${application.applicantId.email}`}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {application.applicantId.email}
                  </a>
                )}
                {application.applicantId?.username && (
                  <p className="text-muted-foreground text-sm">
                    @{application.applicantId.username}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-border border-t px-6 py-6">
            <h2 className="text-foreground mb-4 text-lg font-semibold">
              Cover letter
            </h2>
            <div className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
              {application.coverLetter || (
                <span className="text-muted-foreground italic">
                  No cover letter provided.
                </span>
              )}
            </div>
          </div>

          <div className="border-border border-t px-6 py-6">
            <h2 className="text-foreground mb-4 text-lg font-semibold">
              Resume
            </h2>
            {application.resumeUrl ? (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  Open resume
                </a>
              </Button>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                No resume URL provided.
              </p>
            )}
          </div>

          <div className="border-border bg-muted/20 border-t px-6 py-4">
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Applied{' '}
                {formatDistanceToNow(new Date(application.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <span className="text-border hidden sm:inline">·</span>
              <span>
                Updated{' '}
                {formatDistanceToNow(new Date(application.updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </Card>

        <ApplicationDecisionCard
          applicationId={application._id}
          status={application.status}
          canManage={isJobOwner}
        />
      </div>
    </div>
  );
}
