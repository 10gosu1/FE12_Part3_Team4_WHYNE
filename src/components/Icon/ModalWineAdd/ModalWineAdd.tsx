"use client";

import { useEffect } from "react";
import ModalWineAddHeader from "./components/ModalWineAddHeader";
import ModalWineAddForm from "./components/ModalWinedAddForm";

type ModalWindAddProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalWineAdd({ isOpen, onClose }: ModalWindAddProps) {
  const handleWineSubmit = (data: {
    name: string;
    price: number;
    region: string;
    type: string;
    image: string;
  }) => {
    console.log(data);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 키보드 esc눌러서 모달창 닫을 수 있음.
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end md:items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col gap-[32px] w-full md:w-[460px] p-6 rounded-lg bg-white shadow-lg max-h-screen overflow-y-auto">
        <ModalWineAddHeader onClose={onClose} />
        <ModalWineAddForm onSubmit={handleWineSubmit} />
      </div>
    </div>
  );
}
