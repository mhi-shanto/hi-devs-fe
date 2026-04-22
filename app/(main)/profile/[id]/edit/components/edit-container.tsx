'use client';

import { updateUser } from '@/actions/user.actions';
import { UserFormData, UserSchema } from '@/schemas/user.schema';
import { useAuthStore } from '@/store/auth.store';
import { User } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EditProfileBasicSection } from './edit-profile/edit-profile-basic-section';
import { EditProfileBioSection } from './edit-profile/edit-profile-bio-section';
import { EditProfileFormFooter } from './edit-profile/edit-profile-form-footer';
import { EditProfilePageHeader } from './edit-profile/edit-profile-page-header';
import { EditProfilePhotoSection } from './edit-profile/edit-profile-photo-section';
import { EditProfileSkillsSection } from './edit-profile/edit-profile-skills-section';
import { EditProfileSocialSection } from './edit-profile/edit-profile-social-section';

const EditContainer = ({ user }: { user: User }) => {
  const router = useRouter();
  const [skillsInput, setSkillsInput] = useState(user.skills.join(', '));
  const [isUpdatingUserDetails, startUpdating] = useTransition();
  const { setUser } = useAuthStore();

  const methods = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: user.username,
      profileImage: user.profileImage,
      email: user.email,
      name: user.name,
      bio: user.bio,
      location: user.location,
      website: user.website,
      socialLinks: {
        twitter: user.socialLinks.twitter,
        linkedin: user.socialLinks.linkedin,
        github: user.socialLinks.github,
      },
      skills: user.skills,
    },
  });

  const { setValue, handleSubmit, reset } = methods;

  const handleCancel = () => {
    reset();
    setSkillsInput(user.skills.join(', '));
  };

  const handleSkillsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSkillsInput(input);

    const skillsArray = input
      .split(',')
      .map(skill => skill.trim())
      .filter(Boolean);

    setValue('skills', skillsArray);
  };

  const onSubmit = (data: UserFormData) => {
    startUpdating(async () => {
      try {
        const response = await updateUser(user._id, data);
        if (response.success) {
          toast.success('Profile updated successfully!', {
            position: 'top-center',
            duration: 2000,
          });
          setUser(response.user!);
          router.push('/profile');
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'There was an error updating your profile. Please try again.',
          {
            position: 'top-center',
            duration: 3000,
          },
        );
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 pb-12 lg:p-6">
      <EditProfilePageHeader />

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-fade-in space-y-6"
        >
          <EditProfilePhotoSection />
          <EditProfileBasicSection />
          <EditProfileBioSection />
          <EditProfileSkillsSection
            skillsInput={skillsInput}
            onSkillsInputChange={handleSkillsInputChange}
          />
          <EditProfileSocialSection />
          <EditProfileFormFooter
            isSaving={isUpdatingUserDetails}
            onCancel={handleCancel}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default EditContainer;
