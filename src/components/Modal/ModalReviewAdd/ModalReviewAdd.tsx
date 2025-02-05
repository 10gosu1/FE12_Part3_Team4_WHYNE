import { useEffect } from "react";
import ModalReviewForm from "./components/ModalReviewForm";
import ModalReviewHeader from "./components/ModalReviewHeader";

export default function ModalReviewAdd() {
  return (
    <div>
      <ModalReviewHeader />
      <ModalReviewForm />
    </div>
  );
}
