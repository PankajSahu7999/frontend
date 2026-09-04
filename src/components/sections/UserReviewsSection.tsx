"use client";

import { useEffect, useState } from "react";
import { Calendar, Star, UserCheck } from "lucide-react";
import UserReviewForm from "@/components/UserReviewForm";

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_position?: string | null;
  content: string;
  rating: string | number;
  created_at: string;
  status?: string;
}

interface UserReviewsSectionProps {
  casinoId: string;
  casinoName: string;
}

export default function UserReviewsSection({
  casinoId,
  casinoName,
}: UserReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/casino-reviews/casino/${casinoId}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [casinoId]);

  const handleReviewSuccess = (newReview?: Review) => {
    if (newReview) {
      setReviews((prev) => [newReview, ...prev]);
    } else {
      fetchReviews();
    }
  };

  return (
    <div className="mt-4">
      {/* Section Header */}
      <div className="mb-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-poppins text-[24px] font-bold leading-[24px] text-[#16171D]">
            User Reviews
          </h2>

          <p className="mt-2 text-[12px] text-[#6B7280]">
            Real experiences shared by players.
          </p>
        </div>

        <UserReviewForm
          casinoId={casinoId}
          casinoName={casinoName}
          onSuccess={handleReviewSuccess}
        />
      </div>

      {/* Review Container */}
    {/* Review Container */}
<div className="relative group">
 
 

  {/* Outer Gradient Border */}
  <div className="rounded-[24px] bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)] p-[2px]">

    {/* Inner Gradient Background */}
    <div className="rounded-[22px] bg-[linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-4">

      {loading ? (
        <div className="py-8 text-center text-sm text-gray-500">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first player to share your experience!
          </p>
        </div>
      ) : (
        <div
          id="reviews-scroll"
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex min-w-[340px] flex-col rounded-[22px] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm "
            >
              {/* User Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2E68FB,#588CF3)] text-lg font-bold text-white shadow-sm">
                  {review.reviewer_name
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="text-[18px] font-bold leading-tight text-[#151515]">
                    {review.reviewer_name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                    <UserCheck className="h-3 w-3 text-[#00B67A]" />
                    {review.reviewer_position || "User"}
                  </div>
                </div>
              </div>

              {/* Rating and Date */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill="#FFB000"
                        color="#FFB000"
                      />
                    ))}
                  </div>

                  <span className="ml-1 text-[12px] font-bold text-[#363636]">
                    {Number(review.rating).toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Calendar className="h-3 w-3" />

                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Review Content */}
              <div className="mt-4 rounded-xl bg-white/60 p-3">
                <p className="line-clamp-4 text-sm leading-6 text-[#374151]">
                  "{review.content}"
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="mt-4">
                <span className="inline-flex rounded-md bg-[#00B67A] px-2 py-1 text-[9px] font-bold text-white">
                  Verified User Review
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
    </div>
  );
}