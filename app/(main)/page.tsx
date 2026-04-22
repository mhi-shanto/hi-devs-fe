import { Sparkles } from 'lucide-react';
import RecentBlogs from './_components/recent-blogs';
import RecentJobs from './_components/recent-jobs';
import RecentQuestions from './_components/recent-questions';

const HomePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 pb-10 lg:p-6 lg:pb-12">
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <Sparkles
              className="text-primary-foreground h-6 w-6"
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <div className="min-w-0">
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
              hi-devs
            </p>
            <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Discover
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
              Fresh questions, posts, and roles from the community—newest first.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        <RecentQuestions />
        <RecentBlogs />
        <RecentJobs />
      </div>
    </div>
  );
};

export default HomePage;
