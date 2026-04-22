import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  AtSign,
  BadgeCheck,
  Calendar,
  Edit,
  Github,
  Globe,
  Hash,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@/types/user.type';

const ProfileDetails = ({ user }: { user: User }) => {
  const editId = user.id ?? user._id;
  const joinedAgo = formatDistanceToNow(new Date(user.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="border-border bg-surface shadow-card rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar className="ring-border h-24 w-24 shrink-0 ring-2">
          <AvatarImage src={user.profileImage} alt={user.username || 'User'} />
          <AvatarFallback className="text-lg font-semibold">
            {user.username?.substring(0, 2).toUpperCase() ?? '?'}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                  {user.name}
                </h2>
                {user.isVerified ? (
                  <span className="text-primary inline-flex items-center gap-0.5 text-sm font-medium">
                    <BadgeCheck className="h-4 w-4" aria-hidden />
                    Verified
                  </span>
                ) : null}
              </div>
              <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <AtSign
                    className="h-3.5 w-3.5 shrink-0 opacity-80"
                    aria-hidden
                  />
                  {user.username}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail
                    className="h-3.5 w-3.5 shrink-0 opacity-80"
                    aria-hidden
                  />
                  {user.email}
                </span>
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 rounded-lg"
              asChild
            >
              <Link href={`/profile/${editId}/edit`}>
                <Edit className="h-4 w-4" aria-hidden />
                Edit profile
              </Link>
            </Button>
          </div>

          {user.bio ? (
            <p className="text-foreground/95 text-sm leading-relaxed">
              {user.bio}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm italic">
              No bio yet. Tell the community what you work on.
            </p>
          )}

          <div className="text-muted-foreground border-border flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              Joined {joinedAgo}
            </span>
            {user.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                {user.location}
              </span>
            ) : null}
            {user.website ? (
              <a
                href={
                  user.website.startsWith('http')
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-1.5 font-medium hover:underline"
              >
                <Globe className="h-4 w-4 shrink-0" aria-hidden />
                Website
              </a>
            ) : null}
          </div>

          {(user.socialLinks.github ||
            user.socialLinks.twitter ||
            user.socialLinks.linkedin) && (
            <div className="flex flex-wrap gap-2">
              {user.socialLinks.github ? (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-muted/40 text-foreground hover:border-primary/50 hover:text-primary inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
              ) : null}
              {user.socialLinks.twitter ? (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-muted/40 text-foreground hover:border-primary/50 hover:text-primary inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Twitter className="h-4 w-4" aria-hidden />
                  Twitter
                </a>
              ) : null}
              {user.socialLinks.linkedin ? (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-muted/40 text-foreground hover:border-primary/50 hover:text-primary inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  LinkedIn
                </a>
              ) : null}
            </div>
          )}

          {user.skills && user.skills.length > 0 && (
            <div className="border-border border-t pt-4">
              <h3 className="text-foreground mb-2 flex items-center gap-2 text-sm font-semibold">
                <Hash className="text-muted-foreground h-4 w-4" aria-hidden />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetails;
