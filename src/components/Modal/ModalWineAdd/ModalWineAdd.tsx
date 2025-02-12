"use client";

import { useEffect, useState } from "react";
import ModalWineAddHeader from "./components/ModalWineAddHeader";
import ModalWineAddForm from "./components/ModalWineAddForm";

type ModalWindAddProps = {
  isOpen: boolean;
  onClose: () => void;
  wineToEdit?: {
    id: number;
    name: string;
    price: number;
    region: string;
    type: string;
    image: string;
  };
  onSubmit: (wineData: any) => Promise<void>;
  isEditMode: boolean;
};

export default function ModalWineAdd({
  isOpen,
  onClose,
  wineToEdit,
  onSubmit,
  isEditMode,
}: ModalWindAddProps) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (wineToEdit) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [wineToEdit]);

  const handleWineSubmit = async (data: {
    name: string;
    price: number;
    region: string;
    type: string;
    image: string;
  }) => {
    console.log(data);
    await onSubmit(data); // onSubmit을 호출하여 부모에서 처리
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
        <ModalWineAddHeader onClose={onClose} isEditMode={isEditMode} />
        <ModalWineAddForm
          onSubmit={handleWineSubmit}
          onClose={onClose}
          initialData={
            wineToEdit || {
              name: "",
              price: 0,
              region: "",
              type: "",
              image: "",
            }
          }
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}
