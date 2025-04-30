import React from 'react';
import ProfileDisplay from '../components/Profile/ProfileDisplay';
import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
    const { user, isLoading, authError } = useAuth();
    return <ProfileDisplay profile={user} isLoading={isLoading} error={authError} />;
};

export default ProfilePage;
