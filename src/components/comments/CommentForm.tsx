
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createComment, updateComment } from '@/services/comments';
import { getCurrentUser } from '@/services/auth';

interface CommentFormProps {
  productId: string;
  commentId?: string;
  initialText?: string;
  onSuccess: () => void;
  isEdit?: boolean;
}

const CommentForm = ({ 
  productId, 
  commentId, 
  initialText = '', 
  onSuccess, 
  isEdit = false 
}: CommentFormProps) => {
  const { toast } = useToast();
  const [text, setText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to post a comment",
        variant: "destructive",
      });
      return;
    }
    
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isEdit && commentId) {
        await updateComment(commentId, text);
        toast({
          title: "Success",
          description: "Comment updated successfully",
        });
      } else {
        await createComment({
          productId,
          userId: currentUser.id,
          userName: currentUser.name,
          text,
        });
        setText('');
        toast({
          title: "Success",
          description: "Comment posted successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving comment:", error);
      toast({
        title: "Error",
        description: "Failed to save comment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment" className="sr-only">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marketplace-purple"
          placeholder="Write a comment..."
          disabled={isLoading}
        />
      </div>
      
      <div className="flex justify-end">
        {isEdit && (
          <button
            type="button"
            onClick={() => onSuccess()}
            className="btn-secondary mr-2"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEdit ? 'Updating...' : 'Posting...'}
            </span>
          ) : (
            isEdit ? 'Update Comment' : 'Post Comment'
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
