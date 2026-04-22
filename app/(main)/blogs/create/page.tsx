import Link from 'next/link';
import { ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';
import BlogForm from './_components/blog-form';

export default function BlogCreatePage() {
  return (
    <div className="mx-auto max-w-4xl p-4 pb-10 lg:p-6 lg:pb-12">
      <nav className="mb-6" aria-label="Breadcrumb">
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to blog
        </Link>
      </nav>

      <header className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <BookOpen
              className="text-primary-foreground h-6 w-6"
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <div className="min-w-0">
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
              Blog
            </p>
            <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              Write a post
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
              Share tutorials, notes, or ideas with the hi-devs community.
            </p>
          </div>
        </div>
      </header>

      <section
        className="border-border bg-surface/60 mb-7 rounded-xl border p-4"
        aria-labelledby="blog-tips-heading"
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Lightbulb className="text-primary h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <h2
              id="blog-tips-heading"
              className="text-foreground text-sm font-medium"
            >
              Before you publish
            </h2>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
              <li>Use a clear title so readers know what to expect</li>
              <li>Format code with the editor toolbar for readability</li>
              <li>Add tags to help others discover your post</li>
            </ul>
          </div>
        </div>
      </section>

      <BlogForm />
    </div>
  );
}
