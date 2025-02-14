"use client";

import { useEffect } from "react";
import ModalWineAddHeader from "./components/ModalWineAddHeader";
import ModalWineAddForm from "./components/ModalWineAddForm";

type WineData = {
  name: string;
  price: number;
  region: string;
  type: "RED" | "WHITE" | "SPARKLING"; // 타입을 string에서 제한된 값으로 수정
  image: string;
  avgRating?: number; // avgRating을 optional로 추가
};

type ModalWineAddProps = {
  isOpen: boolean;
  onClose: () => void;
  wineToEdit?: WineData & { id: number };
  onSubmit: (wineData: WineData) => Promise<void>;
  isEditMode: boolean;
};

export default function ModalWineAdd({
  isOpen,
  onClose,
  wineToEdit,
  onSubmit,
  isEditMode,
}: ModalWineAddProps) {
  const handleWineSubmit = async (data: WineData) => {
    //   console.log(data);
    //   await onSubmit(data); // onSubmit을 호출하여 부모에서 처리
    //   onClose();
    // };
    // 수정 모드일 때는 Wine 객체에서 id를 제외한 WineData만 전달

    const wineDataToSubmit: WineData = {
      name: data.name,
      price: data.price,
      region: data.region,
      type: data.type,
      image: data.image,
      avgRating: data.avgRating,
    };
    console.log(wineDataToSubmit);
    await onSubmit(wineDataToSubmit); // onSubmit을 호출하여 부모에서 처리
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
          initialData={{
            name: wineToEdit?.name ?? "",
            price: wineToEdit?.price ?? 0,
            region: wineToEdit?.region ?? "",
            type: wineToEdit?.type as "RED" | "WHITE" | "SPARKLING",
            image: wineToEdit?.image ?? "",
            avgRating: wineToEdit?.avgRating ?? 0, // 기본값 설정
            //id: wineToEdit?.id ?? undefined, // id도 기본값을 설정
          }}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}
