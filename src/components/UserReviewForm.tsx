"use client";

import { useState } from "react";
import { Star, X, MessageSquarePlus } from "lucide-react";

interface UserReviewFormProps {
  casinoId: string;
  casinoName: string;
  onSuccess?: (newReview?: any) => void;
}

export default function UserReviewForm({
  casinoId,
  casinoName,
  onSuccess,
}: UserReviewFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    content: "",
    rating: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/casino-reviews/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            casino_id: casinoId,
            ...formData,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to submit review");
        return;
      }

      setFormData({
        reviewer_name: "",
        reviewer_email: "",
        content: "",
        rating: 5,
      });

      setIsModalOpen(false);

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Write Review Button */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)] px-6 font-poppins text-[14px] font-semibold text-[#16171D] shadow-[0px_2px_0px_0px_#E36D1F] transition hover:opacity-95"
      >
        <MessageSquarePlus className="h-4 w-4" />
        Write a Review
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-2xl border border-[#2E68FB]/20 bg-[linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between border-b border-[#2E68FB]/20 pb-4">
              <div>
                <span className="inline-flex rounded-md bg-[linear-gradient(90deg,#F59E0B_0%,#D97706_100%)] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white">
                  Player Feedback
                </span>

                <h3 className="mt-2 font-poppins text-[24px] font-bold text-[#16171D]">
                  Share Your Experience
                </h3>

                <p className="mt-1 text-[12px] text-[#4D4D4D]">
                  Tell other players about your experience with{" "}
                  <span className="font-semibold">{casinoName}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-white hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-[#16171D]">
                    Your Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.reviewer_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviewer_name: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="h-[46px] w-full rounded-xl border border-[#2E68FB]/20 bg-white/80 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#2E68FB] focus:ring-2 focus:ring-[#2E68FB]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-[#16171D]">
                    Your Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.reviewer_email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviewer_email: e.target.value,
                      })
                    }
                    placeholder="john@example.com"
                    className="h-[46px] w-full rounded-xl border border-[#2E68FB]/20 bg-white/80 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#2E68FB] focus:ring-2 focus:ring-[#2E68FB]/10"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#16171D]">
                  Your Rating
                </label>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          rating: star,
                        })
                      }
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= formData.rating
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}

                  <span className="ml-2 text-sm font-semibold text-[#92400E]">
                    {formData.rating}/5
                  </span>
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#16171D]">
                  Your Review <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: e.target.value,
                    })
                  }
                  rows={5}
                  placeholder={`Share your experience with ${casinoName}...`}
                  className="w-full resize-none rounded-xl border border-[#2E68FB]/20 bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#2E68FB] focus:ring-2 focus:ring-[#2E68FB]/10"
                />
              </div>

              {/* Error */}
              {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[50px] w-full rounded-xl bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)] font-poppins text-sm font-bold text-[#16171D] shadow-[0px_2px_0px_0px_#E36D1F] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Review..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}