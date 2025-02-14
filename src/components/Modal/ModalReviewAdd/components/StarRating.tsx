import Icon from "@/components/Icon/Icon";

const MAXRATING = 5;

type StarRatingProps = {
  rating: number;
  setRating?: (value: number) => void;
};

export default function StarRating({ rating, setRating }: StarRatingProps) {
  return (
    <div className="flex flex-row">
      {Array.from({ length: MAXRATING }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            onClick={setRating ? () => setRating(starValue) : undefined}
          >
            <Icon
              name="star"
              size={32}
              className={
                starValue <= rating ? "text-purple-600" : "text-gray-400"
              }
              viewBox="0 0 24 24"
            />
          </button>
        );
      })}
    </div>
  );
}
