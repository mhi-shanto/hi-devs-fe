'use server';

import { ApplicationSchema } from '@/schemas/applicatio.schema';
import { Application } from '@/types/application';
import { patch, post } from '@/utils/methods';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const applyToJob = async (data: {
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
  email: string;
}) => {
  try {
    const cookieStore = await cookies();
    const response = await post<{
      message: string;
      application: ApplicationSchema;
    }>('/api/applications', data, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    return {
      success: true,
      message: response.message || 'Application submitted successfully',
      data: response.application || null,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to apply to job',
    };
  }
};

export async function updateApplicationStatus(
  applicationId: string,
  status: 'accepted' | 'rejected',
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || '';
    const response = await patch<{
      message: string;
      application: Application;
    }>(
      `/api/applications/${applicationId}`,
      { status },
      {
        isAuthenticated: true,
        token,
      },
    );
    revalidatePath(`/applications/${applicationId}`);
    return {
      success: true,
      message: response.message || 'Application updated',
      application: response.application,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update application',
      application: null,
    };
  }
}
