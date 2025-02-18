import React, { useEffect } from "react";
import Button from "@/components/Button/button";
import clsx from "clsx";
import { showToast } from "@/components/Toast/Toast";

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

  useEffect(() => {
    // ✅ 모달이 열릴 때 body 스크롤 방지
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
      {/* ✅ 모달 배경 (z-index 높이고 pointer-events 조정) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-[1000]"
        onClick={() => setIsOpen(false)} // ✅ 배경 클릭 시 모달 닫기
      ></div>

      {/* ✅ 모달 박스 (드롭다운보다 위에 배치) */}
      <div className="fixed inset-0 flex items-center justify-center z-[1010]">
        <div
          className={clsx(
            "bg-white shadow-md flex items-center gap-4",
            sizeStyles[size]
          )}
        >
          <p className={textStyles[size]}>정말 삭제하시겠습니까?</p>
          <div className={buttonContainerStyles[size]}>
            <Button
              variant="modalCancel"
              className={buttonSize[size]}
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="modal"
              className={buttonSize[size]}
              onClick={() => {
                onConfirm();
                setIsOpen(false);
                showToast("삭제가 완료되었습니다.", "success");
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
