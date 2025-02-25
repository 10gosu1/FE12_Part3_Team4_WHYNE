"use client"

import { useState, useEffect } from "react";
import Button from "@/components/Button/button";
import { Input, InputProfileImage } from "@/components/Input";

interface ProfileSettingProps {
  nickname: string;
  email: string;
  image: string;
  setUser: (user: { nickname: string; email: string; image: string }) => void;
}

const ProfileSetting: React.FC<ProfileSettingProps> = ({
  nickname,
  email,
  image,
  setUser,
}) => {
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newImage, setNewImage] = useState<string>(image);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // UseEffect를 사용하여 nickname과 image가 변경될 때 상태를 업데이트
  useEffect(() => {
    if (newNickname !== nickname) setNewNickname(nickname);
    if (newImage !== image) setNewImage(image);
  }, [nickname, image]);
  

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleImageChange = (file: File, previewUrl: string) => {
    setNewImage(previewUrl);
  };

  const handleUpdate = async () => {
    console.log("💡 업데이트 요청 데이터:", { newNickname, newImage });

    setIsUpdating(true);

    try {
      // setUser에 객체 형태로 전달
      await setUser({
        nickname: newNickname,
        email, // 이메일은 변경되지 않으므로 그대로 전달
        image: newImage,
      });
    } catch (error: any) {
      console.error("❌ 프로필 업데이트 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  

  return (
    <>
      <div className="flex lg:flex-col gap-[32px] md:items-center">
        <InputProfileImage
          currentImage={newImage}
          onImageChange={handleImageChange}
        />
        <div className="flex flex-col lg:items-center gap-[8px] lg:gap-[16px]">
          <h1 className="text-xl-20px-bold md:text-2xl-24px-bold text-gray-800">
            {newNickname}
          </h1>
          <p className="text-md-14px-regular md:text-lg-16px-regular text-gray-500">
            {email}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-col items-end gap-[6px] md:gap-[24px] lg:gap-[8px] w-full">
        <div className="flex flex-col gap-[8px] md:gap-[10px] w-full">
          <h2 className="text-md-14px-medium md:text-lg-16px-medium lg:text-lg-16px-medium text-gray-800">
            닉네임
          </h2>
          <Input
            value={newNickname}
            onChange={handleNicknameChange}
            disabled={isUpdating}
          />
        </div>
        <Button
          variant="button"
          className="h-[42px] md:h-[48px] lg:h-[42px] text-md-14px-bold md:text-lg-16px-bold lg:text-lg-16px-bold"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "변경 중..." : "변경하기"}
        </Button>
      </div>
    </>
  );
};

export default ProfileSetting;
