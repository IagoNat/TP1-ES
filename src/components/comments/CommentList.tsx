
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/types/marketplace';
import { getCommentsByProductId, deleteComment } from '@/services/comments';
import { getCurrentUser } from '@/services/auth';
import CommentForm from './CommentForm';

interface CommentListProps {
  productId: string;
}

const CommentList = ({ productId }: CommentListProps) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  
  const currentUser = getCurrentUser();
  
  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByProductId(productId);
      // Sort comments by date (newest first)
      fetchedComments.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  
  const handleEdit = (commentId: string) => {
    setEditingCommentId(commentId);
  };
  
  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-marketplace-gray-dark">Comments</h3>
      
      {currentUser && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="text-marketplace-gray-dark font-medium mb-3">Add a Comment</h4>
          <CommentForm 
            productId={productId} 
            onSuccess={fetchComments} 
          />
        </div>
      )}
      
      {comments.length === 0 ? (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-marketplace-gray mb-2">No comments yet</p>
          <p className="text-sm text-marketplace-gray">
            Be the first to share your thoughts about this product!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm">
              {editingCommentId === comment.id ? (
                <CommentForm
                  productId={productId}
                  commentId={comment.id}
                  initialText={comment.text}
                  onSuccess={() => {
                    setEditingCommentId(null);
                    fetchComments();
                  }}
                  isEdit
                />
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-marketplace-purple text-white rounded-full flex items-center justify-center">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-marketplace-gray-dark font-medium">
                          {comment.userName}
                        </h4>
                        <p className="text-marketplace-gray text-xs">
                          {formatDate(comment.createdAt)}
                          {comment.updatedAt > comment.createdAt && ' (edited)'}
                        </p>
                      </div>
                    </div>
                    
                    {currentUser && currentUser.id === comment.userId && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(comment.id)}
                          className="text-marketplace-gray hover:text-marketplace-purple transition-colors"
                          aria-label="Edit comment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-marketplace-gray hover:text-red-500 transition-colors"
                          aria-label="Delete comment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-marketplace-gray-dark">
                    {comment.text}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
