'use client';

import { useEffect, useState } from 'react';
import { Star, BadgeCheck } from 'lucide-react';

interface AdminReviewsProps {
  casinoId: string;
}

export default function AdminReviews({ casinoId }: AdminReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casino-reviews/casino/${casinoId}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching admin reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [casinoId]);

  if (loading) {
    return <div className="text-gray-500">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-[20px] border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-gray-500">No expert reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-[20px] border border-[#F59E0B] bg-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(231.79deg,#D5EDFF_17.69%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F59E0B]">
                <span className="font-poppins text-[30px] font-bold text-white">
                  {review.reviewer_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-poppins font-semibold text-[22px] leading-[100%] tracking-normal text-[#16171D]">
                  {review.reviewer_name}
                </h3>

                <p className="mt-1 text-[12px] text-[#666666]">
                  {review.reviewer_position || 'Expert'}{review.reviewer_experience_years ? ` • ${review.reviewer_experience_years} Years Experience` : ''}
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full bg-[#F59E0B] p-[1px]">
              <div className="flex items-center gap-2 rounded-full bg-[#FFF8E6] px-4 py-2">
                <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-[11px] font-semibold uppercase text-[#F59E0B]">
                  Verified Expert
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-[#2E68FB]" />

          {/* Content */}
          <div className="space-y-2">
            <p className="text-[16px] leading-9 font-medium text-[#16171D]">
              {review.content}
            </p>
          </div>

          {/* Bottom Divider */}
          <div className="my-6 h-px bg-[#2E68FB]" />

          {/* Footer */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[14px] text-[#666666]">Verdict</p>

              <div className="mt-1 flex items-center gap-3">
                <span className="font-poppins text-[22px] font-bold text-[#16171D]">
                  {review.verdict || 'Recommended'}
                </span>

                {review.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(review.rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
