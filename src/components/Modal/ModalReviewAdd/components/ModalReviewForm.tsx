"use client";
import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";
import { useState } from "react";

export default function ModalReviewForm() {
  const [values, setValues] = useState({
    rating: 0,
    content: "",
  });
  return (
    <div>
      <ModalReviewRate
        rating={values.rating}
        setRating={(rating) => setValues((prev) => ({ ...prev, rating }))}
        content={values.content}
        setContent={(content) => setValues((prev) => ({ ...prev, content }))}
      />
      <ModalReviewFlavor />
      <ModalReviewSmell />
      <Button>리뷰 남기기</Button>
    </div>
  );
}
