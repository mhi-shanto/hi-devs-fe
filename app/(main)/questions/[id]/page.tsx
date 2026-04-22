import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Hash,
  MessageSquare,
  Share2,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LikeButton from '@/components/buttons/like-button';
import CommentsContainerLayout from '@/components/layout/comments-layout';
import { likeQuestion } from '@/actions/question.actions';
import { Question, QuestionResponse } from '@/types/question';
import { get } from '@/utils/methods';
import MarkDownEditor from './_components/markdown-editor';

const QuestionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let question: Question | null = null;
  let error = null;
  try {
    const response = await get<QuestionResponse>(`/api/questions/${id}`);
    question = response.question;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-10 lg:p-6">
        <p className="text-destructive text-center text-sm">
          Unable to load this question. Please try again later.
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-10 lg:p-6">
        <p className="text-muted-foreground text-center text-sm">
          Question not found.
        </p>
      </div>
    );
  }

  const askedAgo = formatDistanceToNow(new Date(question.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-12 lg:p-6">
      <nav aria-label="Breadcrumb">
        <Link
          href="/questions"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to questions
        </Link>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <MessageSquare
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Question
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {question.title}
          </h1>
        </div>
      </header>

      <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
        {question.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Hash
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden
            />
            {question.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <MarkDownEditor value={question.description || ''} />
        </div>

        <div className="border-border mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={question.askedBy?.profileImage} alt="" />
              <AvatarFallback className="text-sm font-semibold">
                {question.askedBy?.username?.substring(0, 2).toUpperCase() ??
                  '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                <User className="text-muted-foreground h-4 w-4" aria-hidden />
                {question.askedBy.username}
              </p>
              <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Asked {askedAgo}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <LikeButton
              id={question._id}
              likesCount={question.likes?.length ?? 0}
              likes={question.likes ?? []}
              likeFunction={likeQuestion}
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
      </Card>

      <CommentsContainerLayout id={id} commentableType="QUESTION" />
    </div>
  );
};

export default QuestionPage;
