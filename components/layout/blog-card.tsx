import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { BookOpen, Calendar, Hash, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blog } from '@/types/blog';

const BlogCard = ({ blog }: { blog: Blog }) => {
  const publishedAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="border-border bg-surface shadow-card hover:border-primary/30 hover:shadow-elevated animate-slide-up rounded-2xl border p-4 transition-all sm:p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase">
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          Blog
        </span>
      </div>

      {blog.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <Hash
            className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-70"
            aria-hidden
          />
          {blog.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Link
        href={`/blogs/${blog._id}`}
        className="text-foreground hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
      >
        {blog.title}
      </Link>
      <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
        {blog.description}
      </p>

      <div className="border-border mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src={blog.postedBy?.profileImage} alt="" />
            <AvatarFallback className="text-xs font-medium">
              {(blog.postedBy?.name ?? blog.postedBy?.username ?? '?')
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              {blog.postedBy?.name ?? blog.postedBy?.username}
            </p>
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
              {publishedAgo}
            </p>
          </div>
        </div>

        <div className="text-muted-foreground flex items-center gap-1 text-sm tabular-nums">
          <Heart className="h-4 w-4 opacity-70" aria-hidden />
          <span>{blog.likes?.length ?? 0}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
