import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Application, ApplicationsResponse } from '@/types/application';
import { get } from '@/utils/methods';
import { Clock, Eye, FileText, Mail } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const JobApplications = async ({ jobId }: { jobId: string }) => {
  let applications: Application[] | null = null;
  let error: unknown = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const response = await get<ApplicationsResponse>(
      `/api/applications/job/${jobId}`,
      {
        isAuthenticated: true,
        token: accessToken,
      },
    );

    applications = response.applications ?? [];
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="text-muted-foreground text-sm">
        Applications could not be loaded. You may need to sign in as the job
        owner to view them.
      </div>
    );
  }

  if (!applications?.length) {
    return null;
  }

  return (
    <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <h4 className="text-foreground text-base font-semibold tracking-tight">
        Applications ({applications.length})
      </h4>
      <div className="mt-4 space-y-4">
        {applications.map(app => (
          <Card
            key={app._id}
            className="border-border bg-muted/40 rounded-xl border p-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                    <span className="text-primary font-semibold">
                      {app.applicantId.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {app.applicantId.name}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {app.applicantId.email}
                    </p>
                  </div>
                </div>
                {app.coverLetter && (
                  <p className="text-foreground/80 mt-2 text-sm">
                    {app.coverLetter.substring(0, 100)}...
                  </p>
                )}
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  Applied {new Date(app.createdAt).toLocaleDateString()}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      app.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : app.status === 'accepted'
                          ? 'bg-blue-500/20 text-blue-400'
                          : app.status === 'rejected'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {app.resumeUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-1 h-4 w-4" />
                      Resume
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/applications/${app._id}`}>
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default JobApplications;
