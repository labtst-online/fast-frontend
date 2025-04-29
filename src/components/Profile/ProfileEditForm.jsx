import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Common/Input';
import Textarea from '../Common/Textarea';
import Button from '../Common/Button';
import ErrorMessage from '../Common/ErrorMessage';
import LoadingSpinner from '../Common/LoadingSpinner';
import { updateMyProfile } from '../../services/profileService';
import useAuth from '../../hooks/useAuth';


const PLACEHOLDER_AVATAR_EDIT = 'https://placehold.co/80x80/e2e8f0/a0aec0?text=Avatar';
const PLACEHOLDER_AVATAR_ERROR = 'https://placehold.co/80x80/e2e8f0/a0aec0?text=Error';

const ProfileEditForm = ({ currentProfile, isLoading: isProfileLoading, error: profileError }) => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentProfile?.avatar_url || PLACEHOLDER_AVATAR_EDIT);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();
  const { reloadUserProfile } = useAuth();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentProfile) {
      setDisplayName(currentProfile.display_name || '');
      setBio(currentProfile.bio || '');
      setPreviewUrl(currentProfile.avatar_url || PLACEHOLDER_AVATAR_EDIT);
    } else {
      setPreviewUrl(PLACEHOLDER_AVATAR_EDIT);
    }
     setSubmitError(null);
  }, [currentProfile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          setSubmitError("File size exceeds 2MB limit.");
          if(fileInputRef.current) fileInputRef.current.value = "";
          return;
      }
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
           setSubmitError("Invalid file type. Please use PNG, JPG, or GIF.");
           if(fileInputRef.current) fileInputRef.current.value = "";
           return;
      }

      setIconFile(file);
      setSubmitError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setIconFile(null);
      setPreviewUrl(currentProfile?.avatar_url || null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();

    formData.append('display_name', displayName);
    formData.append('bio', bio);

    console.log('Value of iconFile state before appending:', iconFile);

    if (iconFile instanceof File) {
      formData.append('icon', iconFile, iconFile.name);
      console.log('Appended icon file to FormData:', iconFile.name);
    } else if (iconFile) {
      console.warn('iconFile state was truthy but not an instance of File:', iconFile);
    }

    let hasChanges = false;
    if (displayName !== (currentProfile?.display_name || '') ||
        bio !== (currentProfile?.bio || '') ||
        (iconFile instanceof File)) {
        hasChanges = true;
    }

    if (!hasChanges) {
        setSubmitError("No changes detected to save.");
        setIsSubmitting(false);
        return;
    }

    console.log('Submitting FormData...'); 

    try {
      await updateMyProfile(formData);
      await reloadUserProfile();
      navigate('/profile/me');
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.detail || "Failed to update profile. Please try again.";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

   if (isProfileLoading) return <div className="flex justify-center"><LoadingSpinner /></div>;
   if (profileError) return <ErrorMessage message={`Error loading profile data for editing: ${profileError}`} />;
   if (!currentProfile && !isProfileLoading) return <ErrorMessage message="Profile data unavailable for editing." />;


  return (
    <div className="bg-white dark:bg-dark-bg-secondary shadow-lg rounded-lg p-6 md:p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6 border-b border-gray-200 dark:border-dark-border pb-3">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <ErrorMessage message={submitError} />

             <div className="flex items-center space-x-4">
                <img
                    className="h-20 w-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                    src={previewUrl}
                    alt="Avatar Preview"
                    onError={(e) => { e.target.src = PLACEHOLDER_AVATAR_ERROR; }}
                 />
                 <div>
                     <label htmlFor="icon-upload" className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded border ${isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-dark-bg-secondary border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                         Change Avatar
                     </label>
                     <input
                        ref={fileInputRef}
                        id="icon-upload"
                        name="icon"
                        type="file"
                        className="sr-only"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                     />
                     <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">PNG, JPG (Max 2MB).</p>
                 </div>
             </div>

            <Input
                id="display_name"
                name="display_name"
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your public name"
                maxLength={50}
                disabled={isSubmitting}
            />

            <Textarea
                id="bio"
                name="bio"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a little about yourself"
                rows={4}
                maxLength={300}
                disabled={isSubmitting}
            />

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <Button type="button" variant="secondary" onClick={() => navigate('/profile/me')} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
                    Save Changes
                </Button>
            </div>
        </form>
    </div>
  );
};

export default ProfileEditForm;
