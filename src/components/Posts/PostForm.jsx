import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Common/Input';
import Textarea from '../Common/Textarea';
import Button from '../Common/Button';
import ErrorMessage from '../Common/ErrorMessage';
import { createPost } from '../../services/contentService';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (!title.trim()) {
            setSubmitError("Post title cannot be empty.");
            setIsSubmitting(false);
            return;
        }
         if (!content.trim()) {
            setSubmitError("Post content cannot be empty.");
            setIsSubmitting(false);
            return;
        }

        try {
            const newPost = await createPost(title, content);
            console.log("Post created successfully:", newPost);
            navigate(`/posts/${newPost.id}`);
        } catch (error) {
            console.error("Post creation failed:", error.response?.data || error.message);
            const errorMsg = error.response?.data?.detail || "Failed to create post. Please ensure you are logged in and try again.";
            setSubmitError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-main dark:bg-mainDark shadow-lg rounded-lg p-6 md:p-8 max-w-3xl mx-auto text-text dark:text-textDark">
            <h2 className="text-2xl font-bold text-text dark:text-textDark mb-6">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <ErrorMessage message={submitError} />

                <Input
                    id="post-title"
                    name="title"
                    label="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a catchy title for your post"
                    required
                    maxLength={150}
                    disabled={isSubmitting}
                />

                <Textarea
                    id="post-content"
                    name="content"
                    label="Post Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here... You can use line breaks."
                    rows={10}
                    required
                    disabled={isSubmitting}
                />

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
                        Publish Post
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
