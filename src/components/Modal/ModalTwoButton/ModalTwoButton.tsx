import React from "react";
import Button from "@/components/Button/button";
import clsx from "clsx";
import { deleteReview } from "@/lib/api/review"; //  삭제 API 가져오기

interface ModalTwoButtonProps {
  size: "md" | "sm";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  reviewId: number; //  삭제할 리뷰 ID 추가
}

const ModalTwoButton: React.FC<ModalTwoButtonProps> = ({
  size,
  isOpen,
  setIsOpen,
  reviewId, //  리뷰 ID 받음
}) => {
  if (!isOpen) return null;

  //  삭제 기능 실행 함수 (모달 내부에서 처리)
  const handleDeleteReview = async () => {
    try {
      await deleteReview(reviewId); //  API 호출
      setIsOpen(false); //  삭제 후 모달 닫기
    } catch (error) {
      console.error("❌ 리뷰 삭제 실패:", error);
    }
  };

  const sizeStyles = {
    md: "w-[353px] h-[182px] p-[32px_16px_24px_16px] flex flex-col justify-between border border-[#CFDBEA] rounded-[16px]",
    sm: "w-[353px] h-[172px] p-[32px_16px_24px_16px] flex flex-col justify-between border border-[#CFDBEA] rounded-[16px]",
  };

  const buttonContainerStyles = {
    md: "w-[321px] h-[54px] flex justify-between",
    sm: "w-[321px] h-[50px] flex justify-between",
  };

  const buttonSize = {
    md: "w-[150px] h-[54px]",
    sm: "w-[150px] h-[50px]",
  };

  const textStyles = {
    md: "text-xl-20px-bold text-center",
    sm: "text-2lg-18px-bold text-center",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div
        className={clsx(
          "bg-white shadow-md flex items-center gap-4",
          sizeStyles[size]
        )}
      >
        <p className={textStyles[size]}>정말 삭제하시겠습니까?</p>
        <div className={buttonContainerStyles[size]}>
          {/* 취소 버튼 - 모달 닫기 */}
          <Button
            variant="modalCancel"
            className={buttonSize[size]}
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>

          {/* 삭제 버튼 - 삭제 API 호출 및 모달 닫기 */}
          <Button
            variant="modal"
            className={buttonSize[size]}
            onClick={handleDeleteReview} //  삭제 실행
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalTwoButton;
