import { SectionError } from '@/components/Errors';
import BlogCard from '@/components/layout/blog-card';
import { Blog, BlogsResponse } from '@/types/blog';
import { logError } from '@/utils/apiError';
import { get } from '@/utils/methods';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const LIMIT = 3;

function sortByNewestFirst(blogs: Blog[]): Blog[] {
  return [...blogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

const RecentBlogs = async () => {
  let blogs: Blog[] = [];
  let error = null;

  try {
    const response = await get<BlogsResponse>('/api/blogs', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    });
    const raw = response.blogs ?? [];
    blogs = sortByNewestFirst(raw).slice(0, LIMIT);
  } catch (err) {
    error = err;
    logError(err, 'RecentBlogs');
  }

  const sectionHeader = (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <BookOpen className="text-primary h-4 w-4" aria-hidden />
        </span>
        <h2
          id="recent-blogs-heading"
          className="text-foreground text-lg font-semibold tracking-tight"
        >
          Latest posts
        </h2>
      </div>
      <Link
        href="/blogs"
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
        title="Latest posts"
        message="Unable to load blogs right now. Please check back later."
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section aria-labelledby="recent-blogs-heading">
        {sectionHeader}
        <p className="text-muted-foreground text-sm">
          No posts yet. Check back soon.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-blogs-heading">
      {sectionHeader}
      <div className="flex flex-col gap-4">
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
