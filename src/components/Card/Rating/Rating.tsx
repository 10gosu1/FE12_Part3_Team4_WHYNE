"use client";

interface RatingProps {
  rating: number;
  className?: string;
}

const Rating = ({ rating, className }: RatingProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-[6px] px-3 py-1 rounded-[12px] bg-purple-10 w-fit h-fit ${className}`}
    >
      <span className="text-lg-16px-semibold text-purple-100 leading-none align-middle">
        ★
      </span>
      <span className="text-lg-16px-semibold text-purple-100 leading-none align-middle">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
export default Rating;
