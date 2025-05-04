'use client';
import React, { useState } from 'react';

type Comment = {
  userId: string;
  text: string;
};

const CommentSection: React.FC<{ productId: string }> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComments = [...comments, { userId: 'user1', text: newComment }];
    setComments(newComments);
    setNewComment('');
  };

  return (
    <div>
      <h3>Comentários</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Comentar</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment.userId}: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
