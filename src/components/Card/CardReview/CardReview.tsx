"use client";

import { useState } from "react";
import MoreMenu from "@/components/Moremenu/MoreMenu";
import LikeButton from "@/components/Like/LikeButton";
import ProfileDisplay from "@/components/Card/ProfileDisplay/ProfileDisplay";
import CardText from "@/components/Card/CardText/CardText";
import AromaTag from "@/components/Card/AromaTag/AromaTag";
import FlavorSlider from "@/components/Card/Flavor/FlavorSlider";
import Rating from "@/components/Card/Rating/Rating";
import Icon from "@/components/Icon/Icon";

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
  const [isExpanded, setIsExpanded] = useState(false); //  접기/펼치기 상태 추가

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

      {/* 3. 리뷰 내용 & FlavorSlider (isExpanded가 true일 때만 표시) */}
      {isExpanded && (
        <>
          <CardText className="text-gray-900 font-medium break-words whitespace-normal w-full">
            {review.content}
          </CardText>

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
        </>
      )}

      {/* 4. 접기/펼치기 버튼 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full py-2 transition-transform duration-200"
      >
        <Icon
          name="more" // 기존 아이콘 사용
          size={40}
          className={`text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  );
};

export default ReviewCard;
