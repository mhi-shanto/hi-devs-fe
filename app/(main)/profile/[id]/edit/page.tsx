import Link from 'next/link';
import { IUserResponse, User } from '@/types/user.type';
import EditContainer from './components/edit-container';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';

const EditProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let user: User | null = null;
  let error: unknown = null;

  try {
    const { id } = await params;
    const cookieStore = await cookies();

    const response = await get<IUserResponse>(`/api/users/${id}`, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    user = response.user;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 p-4 py-12 text-center lg:p-6">
        <p className="text-destructive text-sm font-medium">
          Unable to load this profile for editing
        </p>
        <p className="text-muted-foreground text-sm">
          You may not have access, or the account does not exist.
        </p>
        <Link
          href="/profile"
          className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
        >
          Back to profile
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 p-4 py-12 text-center lg:p-6">
        <p className="text-muted-foreground text-sm">User not found.</p>
        <Link
          href="/profile"
          className="text-primary inline-block text-sm font-medium hover:underline"
        >
          Back to profile
        </Link>
      </div>
    );
  }

  return <EditContainer user={user} />;
};

export default EditProfilePage;
