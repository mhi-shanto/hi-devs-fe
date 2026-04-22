import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ProfileActivityTabs from './profile-activity-tabs';
import ProfileQuestions from './profile-questions';
import ProfileBlogs from './profile-blogs';
import ProfileJobs from './profile-jobs';

const fallback = (label: string) => (
  <div className="border-border bg-muted/30 text-muted-foreground flex items-center gap-2 rounded-xl border px-4 py-10 text-sm">
    <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
    Loading {label}…
  </div>
);

const ProfileActivity = () => {
  return (
    <Card className="border-border bg-surface shadow-card rounded-2xl border p-4 sm:p-6">
      <h3 className="text-foreground mb-4 text-base font-semibold tracking-tight">
        Activity
      </h3>
      <ProfileActivityTabs
        questionsContent={
          <Suspense fallback={fallback('questions')}>
            <ProfileQuestions />
          </Suspense>
        }
        blogsContent={
          <Suspense fallback={fallback('blogs')}>
            <ProfileBlogs />
          </Suspense>
        }
        jobsContent={
          <Suspense fallback={fallback('jobs')}>
            <ProfileJobs />
          </Suspense>
        }
      />
    </Card>
  );
};

export default ProfileActivity;
