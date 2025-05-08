import React, { useState } from 'react';
import axios from 'axios';
import { Album } from '../types/AlbumType';
// import { User } from '../types/UserType'
import { CreateReview, Review } from '../types/ReviewType';
import { useAuth } from '../AuthContext'; 

interface ReviewFormProps {
  album: Album;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ album }) => {
  const { user } = useAuth(); 
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const ratingChangeHanlder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) {
      setError('Comment is required');
      return;
    }

    if (!user) {
      setError('Login please');
      return;
    }

    const newReview: CreateReview = {
      album:Album,
    //   user: user, 
      rating,
      comment,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

     
      const response = await axios.post('http://localhost:5000/api/reviews', newReview);

      setSuccess('Review submitted');
      setComment('');
      setRating(undefined);
    } catch (error) {
      setError('Review Failed');
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h2>Review {album.title}</h2>
      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" value={rating || ''} onChange={ratingChangeHanlder}  min="1" max="5" required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <input type="textarea" id="comment" value={comment} onChange={commentChangeHandler} placeholder="Write your review here..." required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'working' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
