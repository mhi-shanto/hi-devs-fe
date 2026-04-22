import { Clock, User } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Question } from '@/types/question';

const QuestionCard = ({ question }: { question: Question }) => {
  const askedAgo = formatDistanceToNow(new Date(question.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="border-border bg-surface shadow-card hover:border-primary/30 hover:shadow-elevated animate-slide-up rounded-2xl border p-4 transition-all sm:p-5">
      <div className="min-w-0">
        <Link
          href={`/questions/${question._id}`}
          className="text-foreground hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
        >
          {question.title}
        </Link>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
          {question.description}
        </p>

        {question.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {question.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarImage src={question.askedBy?.profileImage} alt="" />
              <AvatarFallback className="text-[10px]">
                {(question.askedBy?.username ?? '?')
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground/90 flex items-center gap-1 font-medium">
              <User className="h-3.5 w-3.5 opacity-70" aria-hidden />
              {question.askedBy?.username ?? 'Member'}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            {askedAgo}
          </span>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
