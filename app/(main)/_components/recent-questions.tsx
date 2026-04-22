import { SectionError } from '@/components/Errors';
import QuestionCard from '@/components/layout/question-card';
import { Question, QuestionsResponse } from '@/types/question';
import { get } from '@/utils/methods';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const LIMIT = 3;

const RecentQuestions = async () => {
  let questions: Question[] = [];
  let error = null;

  try {
    const response = await get<QuestionsResponse>('/api/questions', {
      params: { limit: LIMIT, sortOrder: 'desc' },
      retry: 2,
      timeout: 5000,
    });
    questions = (response.questions ?? []).slice(0, LIMIT);
  } catch (err) {
    error = err;
  }

  const sectionHeader = (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <MessageSquare className="text-primary h-4 w-4" aria-hidden />
        </span>
        <h2
          id="recent-questions-heading"
          className="text-foreground text-lg font-semibold tracking-tight"
        >
          Recent questions
        </h2>
      </div>
      <Link
        href="/questions"
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
        title="Recent questions"
        message="Unable to load questions right now. Please check back later."
      />
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <section aria-labelledby="recent-questions-heading">
        {sectionHeader}
        <p className="text-muted-foreground text-sm">
          No questions yet. Be the first to ask.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-questions-heading">
      {sectionHeader}
      <div className="space-y-4">
        {questions.map(question => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default RecentQuestions;
