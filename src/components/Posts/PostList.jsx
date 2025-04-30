import React from 'react';
import PostCard from './PostCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const PostList = ({ posts, isLoading, error, title = "Posts", emptyMessage = "No posts found." }) => {

  if (isLoading) {
    return <div className="flex justify-center items-center h-40"><LoadingSpinner /></div>;
  }

  if (error) {
    return <ErrorMessage message={`Failed to load posts: ${error}`} />;
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center text-secondary dark:text-secondaryDark py-8">{emptyMessage}</p>;
  }

  return (
    <section>
        <h2 className="text-2xl font-bold text-main dark:text-mainDark mb-6">{title}</h2>
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    </section>
  );
};

export default PostList;
