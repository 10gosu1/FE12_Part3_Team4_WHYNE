import { useState, useEffect } from "react";
import Button from "@/components/Button/button";
import { Input, InputProfileImage } from "@/components/Input";
import { updateUserProfile } from "@/lib/api/user";
import { showToast } from "@/components/Toast/Toast";

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
    setNewNickname(nickname);
    setNewImage(image);
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
      const updatedUser = await updateUserProfile(newNickname, newImage);
      setUser(updatedUser);
      showToast("프로필이 성공적으로 업데이트되었습니다!", "success");

      //alert("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ 프로필 업데이트 실패:", error);
        showToast("프로필 업데이트 중 오류가 발생했습니다.", "error");

        //alert("프로필 업데이트 중 오류가 발생했습니다.");
      }
    } finally {
      setIsUpdating(false); // 로딩 상태 해제
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
