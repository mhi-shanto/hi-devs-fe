'use client';

import type { ReactNode } from 'react';
import { BookOpen, Briefcase, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  questionsContent: ReactNode;
  blogsContent: ReactNode;
  jobsContent: ReactNode;
};

export default function ProfileActivityTabs({
  questionsContent,
  blogsContent,
  jobsContent,
}: Props) {
  return (
    <Tabs defaultValue="questions" className="w-full">
      <TabsList className="border-border bg-muted/40 mb-6 grid h-auto w-full grid-cols-3 gap-1 rounded-xl border p-1 sm:inline-flex sm:w-auto sm:justify-start">
        <TabsTrigger
          value="questions"
          className="data-[state=active]:bg-background gap-2 rounded-lg"
        >
          <MessageSquare className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Questions</span>
          <span className="sm:hidden">Q&A</span>
        </TabsTrigger>
        <TabsTrigger
          value="blogs"
          className="data-[state=active]:bg-background gap-2 rounded-lg"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          Blogs
        </TabsTrigger>
        <TabsTrigger
          value="jobs"
          className="data-[state=active]:bg-background gap-2 rounded-lg"
        >
          <Briefcase className="h-4 w-4" aria-hidden />
          Jobs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="questions" className="mt-0 outline-none">
        {questionsContent}
      </TabsContent>

      <TabsContent value="blogs" className="mt-0 outline-none">
        {blogsContent}
      </TabsContent>

      <TabsContent value="jobs" className="mt-0 outline-none">
        {jobsContent}
      </TabsContent>
    </Tabs>
  );
}
