import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageSquare } from 'lucide-react';
import { Blog } from '@/types/blog';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated animate-slide-up group overflow-hidden rounded-2xl border transition-all">
      {blog?.cover && (
        <Link href={`/blogs/${blog._id}`}>
          <Image
            src={blog?.cover}
            alt={blog?.title}
            height={200}
            width={400}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {blog?.tags?.map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <Link
          href={`/blogs/${blog?._id}`}
          className="text-foreground hover:text-primary line-clamp-2 block text-xl font-semibold transition-colors"
        >
          {blog?.title}
        </Link>

        {/* <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
          {blog.excerpt}
        </p> */}

        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={blog?.postedBy?.profileImage}
                alt={blog?.postedBy?.username || 'User'}
              />
              <AvatarFallback className="font-bold">
                {blog?.postedBy?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground text-sm font-medium">
                {blog?.postedBy?.name}
              </p>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <span>
                  {formatDistanceToNow(new Date(blog?.createdAt), {
                    addSuffix: true,
                  })}{' '}
                </span>
                <span>·</span>
                {/* <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {blog.readTime} min read
                </div> */}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <button
              className={`hover:text-primary text-primary} flex items-center gap-1 transition-colors`}
            >
              <Heart className={`h-4 w-4 fill-current`} />
              {0}
            </button>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {0}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
