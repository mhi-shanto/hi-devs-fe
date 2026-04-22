'use client';

import { createQuestion } from '@/actions/question.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuestionFormData, QuestionSchema } from '@/schemas/question';
import { logError } from '@/utils/apiError';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, Hash, Heading2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
      <p className="text-muted-foreground">Loading editor...</p>
    </div>
  ),
});

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground">Loading preview...</div>
    ),
  },
);

const customCommands: ICommand[] = [
  commands.bold,
  commands.italic,
  commands.link,
  commands.code,
  commands.codeBlock,
  commands.checkedListCommand,
];

const QuestionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    reset,
    getValues,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionSchema),
    mode: 'onBlur',
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const selectedTags = getValues('tags') || [];
  const descriptionValue = getValues('description') || '';

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setTagInput('');
      setValue('tags', [...selectedTags, tag]);
      setError('tags', {});
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      'tags',
      selectedTags.filter(t => t !== tag),
    );
  };

  const onSubmit = async (data: QuestionFormData) => {
    startTransition(async () => {
      try {
        const response = await createQuestion(data);
        if (response.success) {
          toast.success('Question created successfully!', {
            description:
              'You have created a new question. This will be visible on the questions list.',
            position: 'top-center',
            duration: 2000,
          });
          router.push(`/questions`);
        }
      } catch (error) {
        logError(error, 'QuestionForm');
        console.error(
          error instanceof Error
            ? error.message
            : 'There was an error creating the question. Please try again.',
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-border bg-surface shadow-card space-y-6 rounded-2xl border p-6">
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-foreground inline-flex items-center gap-2 text-sm font-medium"
          >
            <Heading2
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden
            />
            Title
          </Label>
          <Input
            {...register('title')}
            id="title"
            placeholder="What's your programming question? Be specific."
            className="text-lg"
          />
          <p className="text-muted-foreground text-xs">
            Be specific and imagine you&apos;re asking a question to another
            person
          </p>
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground inline-flex items-center gap-2 text-sm font-medium">
            <AlignLeft
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden
            />
            Details
          </Label>
          <div className="border-border overflow-hidden rounded-lg border">
            <div className="border-border bg-muted/30 flex border-b">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'write'
                    ? 'text-foreground border-primary bg-background border-b-2'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-foreground border-primary bg-background border-b-2'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Preview
              </button>
            </div>

            <div className="bg-background p-4">
              {activeTab === 'write' ? (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      preview="edit"
                      hideToolbar={false}
                      commands={customCommands}
                      extraCommands={[]}
                      height={300}
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder:
                          'Include all the information someone would need to answer your question...',
                      }}
                      className="custom-md-editor"
                    />
                  )}
                />
              ) : (
                <div className="prose prose-invert min-h-75 max-w-none">
                  {descriptionValue ? (
                    <MDEditorMarkdown
                      source={descriptionValue}
                      style={{
                        whiteSpace: 'pre-wrap',
                        background: 'transparent',
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Nothing to preview. Write something first.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground inline-flex items-center gap-2 text-sm font-medium">
            <Hash
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden
            />
            Tags
          </Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
          <div className="relative">
            <Input
              placeholder="Add up to 5 tags..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(tagInput.trim());
                }
              }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Add up to 5 tags to describe what your question is about
          </p>
          {errors.tags && (
            <p className="text-destructive text-sm">{errors.tags.message}</p>
          )}
        </div>

        <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="gradient" disabled={isPending}>
            {isPending ? 'Posting...' : 'Post Question'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
