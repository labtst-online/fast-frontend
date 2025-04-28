import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  if (!post) return null;

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : 'N/A';

  const contentParagraphs = post.content?.split('\n').map((para, index) => (
      <p key={index} className="mb-2 last:mb-0">{para}</p>
  )) || <p className="italic">No content provided.</p>;

  return (
    <article className="bg-white dark:bg-dark-bg-secondary shadow-md rounded-lg overflow-hidden mb-6 border border-gray-200 dark:border-dark-border">
      <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
          <Link to={`/creator/${post.creator_id}`}> // Example link
              <img
                  src={post.creator_avatar_url || '[https://placehold.co/40x40/e2e8f0/a0aec0?text=C](https://placehold.co/40x40/e2e8f0/a0aec0?text=C)'}
                  alt="Creator Avatar"
                  className="h-10 w-10 rounded-full mr-3 object-cover bg-gray-200"
                  onError={(e) => { e.target.src = '[https://placehold.co/40x40/e2e8f0/a0aec0?text=Err](https://placehold.co/40x40/e2e8f0/a0aec0?text=Err)'; }}
              />
          </Link>
          <div>
              <Link to={`/creator/${post.creator_id}`} className="font-semibold text-gray-800 dark:text-dark-text hover:underline">
                  {post.creator_name || 'Unknown Creator'}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">Posted on: {formattedDate}</p>
          </div>
      </div>

      <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3 break-words">
              {post.title || <span className="italic">Untitled Post</span>}
          </h3>
          <div className="text-gray-700 dark:text-dark-text-secondary text-sm prose prose-sm dark:prose-invert max-w-none break-words">
              {contentParagraphs}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              Posted on: {formattedDate} (ID: {post.id})
          </div>
      </div>
    </article>
  );
};

export default PostCard;
