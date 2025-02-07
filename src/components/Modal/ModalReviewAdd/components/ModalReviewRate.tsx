"use client";
import Image from "next/image";
import StarRating from "./StarRating";
// import { useParams } from "next/navigation";

type ModalReviewRateProps = {
  rating: number;
  setRating: (value: number) => void;
  content: string;
  setContent: (value: string) => void;
};

export default function ModalReviewRate({
  rating,
  setRating,
  content,
  setContent,
}: ModalReviewRateProps) {
  // const params = useParams;
  // const { id } = params;
  // id를 이용해서 와인의 이미지와 이름을 Get해서 받아온다. 받아온 이미지와 이름을 출력.

  const image = undefined; //임시 추후 삭제
  const name = undefined; //임시 추후 삭제
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4">
        <Image
          src={image ? image : "/images/wine/wine-empty.svg"}
          alt="와인 이미지"
          width={68}
          height={68}
        />
        <div className="flex flex-col gap-2">
          <p className="text-2lg-18px-semibold">{name ? name : "undefined"}</p>
          <StarRating rating={rating} setRating={setRating} />
        </div>
      </div>
      <textarea
        className="w-full max-w-[480px] h-[120px] px-5 py-3.5 border border-gray-300 rounded-2xl lg-16px-regular placeholder-gray-400 resize-none"
        placeholder="후기를 작성해 주세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </div>
  );
}
