import React, { useEffect } from "react";
import Button from "@/components/Button/button";
import clsx from "clsx";
import { showToast } from "@/components/Toast/Toast";

interface ModalTwoButtonProps {
  size: "md" | "sm";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void; // 삭제 기능을 실행할 함수 (MoreMenu에서 전달)
}

const ModalTwoButton: React.FC<ModalTwoButtonProps> = ({
  size,
  isOpen,
  setIsOpen,
  onConfirm, // 삭제 기능을 부모에서 받아옴
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 모달이 열리면 스크롤 방지
    } else {
      document.body.style.overflow = "auto"; // 모달이 닫히면 다시 활성화
    }
    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
    <>
      {/* ✅ 모달 배경 (배경 클릭 시 모달 닫기) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-[1000]"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* ✅ 모달 박스 (내부 클릭 시 닫히지 않도록 설정) */}
      <div className="fixed inset-0 flex items-center justify-center z-[1010]">
        <div
          className={clsx(
            "bg-white shadow-md flex items-center gap-4",
            sizeStyles[size]
          )}
          onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 함
        >
          <p className={textStyles[size]}>정말 삭제하시겠습니까?</p>
          <div className={buttonContainerStyles[size]}>
            {/* 취소 버튼 */}
            <Button
              variant="modalCancel"
              className={buttonSize[size]}
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>

            {/* 삭제 버튼 */}
            <Button
              variant="modal"
              className={buttonSize[size]}
              onClick={() => {
                onConfirm();
                setIsOpen(false);
                showToast("삭제가 완료되었습니다.", "success"); // 삭제 완료 토스트 메시지
              }}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTwoButton;
