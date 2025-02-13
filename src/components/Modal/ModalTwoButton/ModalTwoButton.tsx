import React from "react";
import Button from "@/components/Button/button";
import clsx from "clsx";

interface ModalTwoButtonProps {
  size: "md" | "sm";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void; //  삭제 기능을 실행할 함수 (MoreMenu에서 전달)
}

const ModalTwoButton: React.FC<ModalTwoButtonProps> = ({
  size,
  isOpen,
  setIsOpen,
  onConfirm, //  삭제 기능을 부모에서 받아옴
}) => {
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

          {/* 삭제 버튼 - onConfirm 실행 (MoreMenu.tsx에서 삭제 처리) */}
          <Button
            variant="modal"
            className={buttonSize[size]}
            onClick={() => {
              onConfirm(); //  삭제 실행
              setIsOpen(false); //  모달 닫기
            }}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalTwoButton;
