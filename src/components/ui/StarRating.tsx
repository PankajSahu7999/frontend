'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function formatRating(rating: number | string | null | undefined): string {
  if (rating === null || rating === undefined || rating === '') {
    return '5/5';
  }
  const num = typeof rating === 'number' ? rating : parseFloat(rating.toString());
  if (isNaN(num) || num <= 0) {
    return '5/5';
  }
  if (num % 1 === 0) {
    return `${num}/5`;
  }
  const formatted = num.toFixed(1);
  if (formatted.endsWith('.0')) {
    return `${parseInt(formatted, 10)}/5`;
  }
  return `${formatted}/5`;
}

interface StarRatingProps {
  rating: number | string | null | undefined;
  size?: number;
  className?: string;
  starContainerClassName?: string;
  textClassName?: string;
  showText?: boolean;
  starColor?: string;
  emptyColor?: string;
}

export default function StarRating({
  rating,
  size = 13,
  className = '',
  starContainerClassName = 'flex items-center gap-0.5',
  textClassName = 'text-[12px] font-bold text-[#363636] ml-1',
  showText = true,
  starColor = '#FFB000',
  emptyColor = '#E2E8F0',
}: StarRatingProps) {
  const num = typeof rating === 'number' ? rating : parseFloat(rating?.toString() || '0');
  const validRating = isNaN(num) || num <= 0 ? 5 : Math.min(5, Math.max(0, num));

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={starContainerClassName}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = validRating >= starIndex;
          const isHalf = !isFull && validRating > starIndex - 1;

          if (isFull) {
            return (
              <Star
                key={starIndex}
                size={size}
                fill={starColor}
                color={starColor}
                className="shrink-0"
              />
            );
          }

          if (isHalf) {
            return (
              <div
                key={starIndex}
                className="relative inline-flex items-center justify-center shrink-0"
                style={{ width: size, height: size }}
              >
                {/* Empty base star */}
                <Star
                  size={size}
                  fill={emptyColor}
                  color={emptyColor}
                  className="shrink-0"
                />
                {/* Clipped half star on top */}
                <div className="absolute inset-0 overflow-hidden w-[50%] flex items-center">
                  <Star
                    size={size}
                    fill={starColor}
                    color={starColor}
                    className="shrink-0"
                  />
                </div>
              </div>
            );
          }

          return (
            <Star
              key={starIndex}
              size={size}
              fill={emptyColor}
              color={emptyColor}
              className="shrink-0"
            />
          );
        })}
      </div>

      {showText && (
        <span className={textClassName}>
          {formatRating(rating)}
        </span>
      )}
    </div>
  );
}
