import { useState } from 'react';
import { Comment } from '../types/incident';
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type CommentSectionProps = {
  comments: Comment[];
  onAddComment: (content: string) => void;
};

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full"
        />
        <Button type="submit">Add Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">{comment.author}</h4>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

