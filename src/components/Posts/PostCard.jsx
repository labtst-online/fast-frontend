import React from 'react';
import { Link } from 'react-router-dom';

// Define the placeholder URL as a constant
const PLACEHOLDER_AVATAR_CREATOR = 'https://placehold.co/40x40/e2e8f0/a0aec0?text=C';
const PLACEHOLDER_AVATAR_ERROR = 'https://placehold.co/40x40/e2e8f0/a0aec0?text=Err';

const PostCard = ({ post }) => {
  if (!post) return null;

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : 'N/A';

  const contentParagraphs = post.content?.split('\n').map((para, index) => (
      <p key={index} className="mb-2 last:mb-0">{para}</p>
  )) || <p className="italic">No content provided.</p>;

  return (
    <article className="bg-background dark:bg-backgroundDark shadow-md rounded-lg overflow-hidden mb-6 border border-secondary dark:border-secondaryDark">
      <div className="flex items-center p-4 border-b border-secondary dark:border-secondaryDark">
          <Link to={`/creator/${post.creator_id}`}>
              <img
                  src={post.creator_avatar_url || PLACEHOLDER_AVATAR_CREATOR}
                  alt="Creator Avatar"
                  className="h-10 w-10 rounded-full mr-3 object-cover bg-background dark:bg-backgroundDark"
                  onError={(e) => { e.target.src = PLACEHOLDER_AVATAR_ERROR; }}
              />
          </Link>
          <div>
              <Link to={`/creator/${post.creator_id}`} className="font-semibold text-text dark:text-textDark hover:underline">
                  {post.creator_name || 'Unknown Creator'}
              </Link>
              <p className="text-xs text-secondary dark:text-secondaryDark">Posted on: {formattedDate}</p>
          </div>
      </div>

      <div className="p-5">
          <h3 className="text-xl font-semibold text-text dark:text-textDark mb-3 break-words">
              {post.title || <span className="italic">Untitled Post</span>}
          </h3>
          <div className="text-text dark:text-textDark text-sm prose prose-sm dark:prose-invert max-w-none break-words">
              {contentParagraphs}
          </div>
          <div className="mt-4 pt-3 border-t border-secondary dark:border-secondaryDark text-xs text-secondary dark:text-secondaryDark">
              Posted on: {formattedDate} (ID: {post.id})
          </div>
      </div>
    </article>
  );
};

export default PostCard;
