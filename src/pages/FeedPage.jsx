import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getUserPosts } from '../services/contentService';
import PostList from '../components/Posts/PostList';
import ErrorMessage from '../components/Common/ErrorMessage';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

const FeedPage = () => {
    const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [postsError, setPostsError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user?.user_id) {
                console.log("FeedPage: Waiting for user_id...");
                return;
            }

            console.log(`FeedPage: Fetching posts for user ${user.user_id}`);
            setIsLoadingPosts(true);
            setPostsError(null);
            try {
                const fetchedPosts = await getUserPosts(user.user_id);
                setPosts(fetchedPosts || []);
            } catch (err) {
                console.error("Failed to fetch user posts for feed:", err);
                setPostsError(err.response?.data?.detail || "Could not load your posts.");
                setPosts([]);
            } finally {
                setIsLoadingPosts(false);
            }
        };

        if (!isAuthLoading && isAuthenticated) {
             fetchPosts();
        } else if (!isAuthLoading && !isAuthenticated) {
             setPostsError("Please log in to see your posts.");
             setPosts([]);
        }
    }, [user?.user_id, isAuthenticated, isAuthLoading]);

    if (isAuthLoading) {
         return <div className="flex justify-center pt-10"><LoadingSpinner size="lg" /></div>;
    }

    if (!isAuthenticated) {
        return (
             <div className="text-center py-10">
                 <ErrorMessage message={postsError || "You need to be logged in to view this page."} />
                 <Link to="/login">
                     <Button variant="primary">Login</Button>
                 </Link>
             </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">My Posts</h1>
                 <Link to="/posts/new">
                    <Button variant="primary">Create New Post</Button>
                 </Link>
            </div>

            <PostList
                posts={posts}
                isLoading={isLoadingPosts}
                error={postsError}
                title=""
                emptyMessage="You haven't created any posts yet. Click 'Create New Post' to start!"
            />
        </div>
    );
};

export default FeedPage;
