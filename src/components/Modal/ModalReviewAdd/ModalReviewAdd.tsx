import { useEffect } from "react";
import ModalReviewForm from "./components/ModalReviewForm";
import ModalReviewHeader from "./components/ModalReviewHeader";

type ModalReviewAddProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalReviewAdd({
  isOpen,
  onClose,
  children,
}: ModalReviewAddProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
  });

  return (
    <div>
      <ModalReviewHeader />
      <ModalReviewForm />
    </div>
  );
}
