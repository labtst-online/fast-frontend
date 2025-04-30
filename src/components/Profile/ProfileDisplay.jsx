import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const PLACEHOLDER_AVATAR = 'https://placehold.co/128x128/e2e8f0/a0aec0?text=No+Avatar';

const ProfileDisplay = ({ profile, isLoading, error }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-40"><LoadingSpinner /></div>;
  }

  if (error) {
    const displayError = error ? `Failed to load profile: ${error}` : "Profile data could not be loaded.";
    return <ErrorMessage message={displayError} />;
  }

  if (!profile) {
    return <p className="text-center text-gray-500 dark:text-dark-text-secondary py-8">Profile data is unavailable.</p>;
  }

  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_AVATAR;
  };

  return (
    <div className="bg-background dark:bg-backgroundDark shadow-lg rounded-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
        <img
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-secondary dark:border-secondaryDark bg-background dark:bg-backgroundDark"
            src={profile.avatar_url || PLACEHOLDER_AVATAR}
            alt={profile.display_name ? `${profile.display_name}'s Avatar` : 'User Avatar'}
            onError={handleImageError}
          />
        </div>

        <div className="flex-grow text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-text dark:text-textDark break-words">
            {profile.display_name || 'User'}
          </h1>
          <p className="mt-3 text-text dark:text-textDark whitespace-pre-wrap break-words">
            {profile.bio || <span className="italic">No bio provided.</span>}
          </p>
          <p className="text-xs text-secondary dark:text-secondaryDark mt-4">
            Joined: {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center md:text-right border-t border-secondary dark:border-secondaryDark pt-4">
        <Link to="/profile/edit">
          <Button variant="secondary">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDisplay;
