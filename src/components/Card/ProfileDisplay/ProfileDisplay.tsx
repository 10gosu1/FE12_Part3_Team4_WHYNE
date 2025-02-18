"use client";

import React from "react";
import Image from "next/image";

interface ProfileDisplayProps {
  image?: string;
  nickname: string;
  updatedAt: string; // 마지막 업데이트 시간 (ISO 형식)
  isEdited?: boolean;
}

const DEFAULT_PROFILE_IMAGE = "/images/common/no_profile.svg";

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  image,
  nickname,
  updatedAt,
  isEdited,
}) => {
  const profileImage =
    image && image.trim() !== "" ? image : DEFAULT_PROFILE_IMAGE;

  const getTimeAgo = (dateString: string) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - updatedDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `방금 전`; // ✅ 1분 이하는 "방금 전"으로 표시
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    }
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks}주 전`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}개월 전`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}년 전`;
  };

  return (
    <div className="flex items-center gap-3">
      <Image
        src={profileImage}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{nickname}</span>
        <div className="flex gap-2">
          <span className="text-gray-500 text-sm">{getTimeAgo(updatedAt)}</span>
          {isEdited ? <p className="text-gray-500 text-sm">(수정됨)</p> : <></>}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
