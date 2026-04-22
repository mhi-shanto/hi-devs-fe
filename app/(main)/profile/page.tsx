import { User as UserIcon } from 'lucide-react';
import { SectionError } from '@/components/Errors';
import { IUserResponse, User } from '@/types/user.type';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';
import ProfileDetails from './_components/profile-details';
import ProfileActivity from './_components/profile-activity';

const ProfilePage = async () => {
  let user: User | null = null;
  let error: unknown = null;
  const cookieStore = await cookies();

  try {
    const response = await get<IUserResponse>('/api/users/profile', {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    user = response.user;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-4 py-12 lg:p-6">
        <SectionError
          title="Could not load profile"
          message="Sign in and try again, or refresh the page."
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl space-y-3 p-4 py-12 text-center lg:p-6">
        <p className="text-muted-foreground text-sm">
          No profile data available.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-12 lg:p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="gradient-primary shadow-glow flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <UserIcon
            className="text-primary-foreground h-6 w-6"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Your account
          </p>
          <h1 className="text-foreground mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Profile
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
            Your hi-devs identity, skills, and recent questions, posts, and
            jobs.
          </p>
        </div>
      </header>

      <ProfileDetails user={user} />
      <ProfileActivity />
    </div>
  );
};

export default ProfilePage;
