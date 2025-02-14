"use client";

import MoreMenu from "@/components/Moremenu/MoreMenu";
import LikeButton from "@/components/Like/LikeButton";
import ProfileDisplay from "@/components/Card/ProfileDisplay/ProfileDisplay";
import CardText from "@/components/Card/CardText/CardText";
import AromaTag from "@/components/Card/AromaTag/AromaTag";
import FlavorSlider from "@/components/Card/Flavor/FlavorSlider";
import Rating from "@/components/Card/Rating/Rating";

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface ReviewData {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLiked: boolean;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

const ReviewCard = ({ review }: { review: ReviewData }) => {
  return (
    <div className="flex flex-col w-auto max-w-[800px] p-4 border rounded-lg shadow bg-white space-y-6">
      {/* 1. 프로필 + 좋아요 + MoreMenu */}
      <div className="flex items-center justify-between">
        <ProfileDisplay
          image={review.user.image}
          nickname={review.user.nickname}
          updatedAt={review.updatedAt}
        />
        <div className="flex items-center gap-2">
          <LikeButton
            reviewId={review.id}
            initialLiked={review.isLiked}
            userId={review.user.id}
          />
          <MoreMenu reviewId={review.id} userId={review.user.id} />
        </div>
      </div>

      {/* 2. 태그 & 평점 */}
      <div className="flex justify-between items-center">
        <AromaTag tags={review.aroma} />
        <Rating rating={review.rating} />
      </div>

      {/* 3. 리뷰 내용 */}
      <CardText className="text-gray-900 font-medium break-words whitespace-normal w-full">
        {review.content}
      </CardText>

      {/* 4. FlavorSlider (비율 유지) */}
      <div className="flex w-full flex-col items-center justify-center min-w-0 overflow-hidden">
        <div className="w-full flex-grow min-w-0">
          <FlavorSlider
            lightBold={review.lightBold}
            smoothTannic={review.smoothTannic}
            drySweet={review.drySweet}
            softAcidic={review.softAcidic}
            isReadOnly={true}
            className="w-full flex-grow min-w-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
