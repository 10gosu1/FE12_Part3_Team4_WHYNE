import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";

export default function ModalReviewForm() {
  return (
    <div>
      <ModalReviewRate />
      <ModalReviewFlavor />
      <ModalReviewSmell />
      <Button>리뷰 남기기</Button>
    </div>
  );
}
