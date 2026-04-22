import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  Calendar,
  Hash,
  Share2,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LikeButton from '@/components/buttons/like-button';
import CommentsContainerLayout from '@/components/layout/comments-layout';
import { likeBlog } from '@/actions/blog.actions';
import { Blog, BlogResponse } from '@/types/blog';
import { get } from '@/utils/methods';
import MarkDownEditor from '../../questions/[id]/_components/markdown-editor';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let blog: Blog | null = null;
  let error = null;
  try {
    const response = await get<BlogResponse>(`/api/blogs/${id}`, {
      retry: 2,
      timeout: 5000,
    });
    blog = response.blog;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-10 lg:p-6">
        <p className="text-destructive text-center text-sm">
          Unable to load this post. Please try again later.
        </p>
      </div>
    );
  }

  if (!blog || Object.keys(blog).length === 0) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-10 lg:p-6">
        <p className="text-muted-foreground text-center text-sm">
          Blog not found or unavailable.
        </p>
      </div>
    );
  }

  const publishedAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-12 lg:p-6">
      <nav aria-label="Breadcrumb">
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to blog
        </Link>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <BookOpen
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Blog
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {blog.title}
          </h1>
        </div>
      </header>

      <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
        <div className="prose prose-invert max-w-none">
          <MarkDownEditor value={blog.description || ''} />
        </div>

        <div className="border-border mt-8 space-y-5 border-t pt-6">
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Hash
                className="text-muted-foreground h-4 w-4 shrink-0"
                aria-hidden
              />
              {blog.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={blog.postedBy?.profileImage} alt="" />
                <AvatarFallback className="text-sm font-semibold">
                  {(blog.postedBy?.name ?? blog.postedBy?.username ?? '?')
                    .substring(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                  <User
                    className="text-muted-foreground h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span className="truncate">
                    {blog.postedBy?.name ?? blog.postedBy?.username}
                  </span>
                </p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Published {publishedAgo}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              <LikeButton
                id={blog._id}
                likes={blog.likes ?? []}
                likesCount={blog.likes?.length ?? 0}
                likeFunction={likeBlog}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-lg"
              >
                <Bookmark className="h-4 w-4" aria-hidden />
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-lg"
              >
                <Share2 className="h-4 w-4" aria-hidden />
                Share
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <CommentsContainerLayout id={blog._id} commentableType="BLOG" />
    </div>
  );
};

export default BlogPage;
