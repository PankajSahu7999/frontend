'use client';

import { useState, useEffect } from 'react';
import { Input, Textarea, Button } from './FormElements';
import { Star, Trash2, Plus } from 'lucide-react';

interface CasinoReviewsProps {
  casinoId: string;
}

export default function CasinoReviews({ casinoId }: CasinoReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    reviewer_email: '',
    content: '',
    rating: 5,
    verdict: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [casinoId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casino-reviews/casino/${casinoId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          casino_id: casinoId,
          ...newReview
        }),
      });

      if (res.ok) {
        setNewReview({
          reviewer_name: '',
          reviewer_email: '',
          content: '',
          rating: 5,
          verdict: ''
        });
        setShowAddForm(false);
        fetchReviews();
      }
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Review Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          {showAddForm ? 'Cancel' : 'Add Review'}
        </Button>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Review</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Reviewer Name"
                value={newReview.reviewer_name}
                onChange={(e) => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                placeholder="John Doe"
                required
              />
              <Input
                label="Reviewer Email"
                type="email"
                value={newReview.reviewer_email}
                onChange={(e) => setNewReview({ ...newReview, reviewer_email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Verdict"
              value={newReview.verdict}
              onChange={(e) => setNewReview({ ...newReview, verdict: e.target.value })}
              placeholder="Recommended"
            />

            <Textarea
              label="Review Content"
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Write your review..."
              rows={4}
              required
            />

           <Button
  type="button"
  onClick={handleAddReview}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Adding...' : 'Add Review'}
</Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
            No reviews yet. Add the first review!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#2E68FB] to-[#588CF3]">
                      <span className="text-white font-bold text-sm">
                        {review.reviewer_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.reviewer_name}</h4>
                      <p className="text-xs text-gray-500">{review.reviewer_email || review.reviewer_position}</p>
                    </div>
                  </div>

                  {review.rating && (
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 text-sm mb-2">{review.content}</p>

                  {review.verdict && (
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {review.verdict}
                    </span>
                  )}

                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteReview(review.id, e)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Delete review"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
