import React from 'react';
import useAuth from '../hooks/useAuth';
import ProfileEditForm from '../components/Profile/ProfileEditForm';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const ProfileEditPage = () => {
    const { user, isLoading: isAuthLoading, authError } = useAuth();

    if (isAuthLoading) {
        return <div className="flex justify-center pt-10"><LoadingSpinner size="lg"/></div>;
    }

    if (authError && !user) {
         return <ErrorMessage message={`Cannot edit profile: ${authError}`} />;
    }

    return (
        <ProfileEditForm
            currentProfile={user}
            isLoading={isAuthLoading}
            error={authError}
        />
    );
};

export default ProfileEditPage;
