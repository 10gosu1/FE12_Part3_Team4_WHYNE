"use client";
import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";
import { useState } from "react";

// 1.와인 리뷰에 필요한 값들을 상태값으로 정리.
// 2.(rating,content)값은 ModalReviewRate컴포넌트 / (lightBold, smoothTannic, drySweet, softAcidic)값은 ModalReviewFlavor 컴포넌트 / (aroma[])값은 ModalReviewSmell 컴포넌트
// 3. 각 컴포넌트에서 값을 전달 받아 최종적으로 ModalReviewForm 컴포넌트에서 POST요청을 할 수 있도록 설계.

// 상태값들은 깊어야 2단계정도 prop으로 내려주기 때문에 context사용은 보류 3단계면 사용해야 한다고 판단.
// 리팩토링때 좀 더 쉬운 방법 고안.

export default function ModalReviewForm() {
  const [values, setValues] = useState<{
    rating: number;
    content: string;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    wineId: number;
  }>({
    rating: 0,
    content: "",
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: [],
    wineId: 0,
  });
  return (
    <div className="flex flex-col gap-10">
      <ModalReviewRate
        rating={values.rating}
        setRating={(rating) => setValues((prev) => ({ ...prev, rating }))}
        content={values.content}
        setContent={(content) => setValues((prev) => ({ ...prev, content }))}
      />
      <ModalReviewFlavor
        lightBold={values.lightBold}
        setLightBold={(lightBold) =>
          setValues((prev) => ({ ...prev, lightBold }))
        }
        smoothTannic={values.smoothTannic}
        setSmoothTannic={(smoothTannic) =>
          setValues((prev) => ({ ...prev, smoothTannic }))
        }
        drySweet={values.drySweet}
        setDrySweet={(drySweet) => setValues((prev) => ({ ...prev, drySweet }))}
        softAcidic={values.softAcidic}
        setSoftAcidic={(softAcidic) =>
          setValues((prev) => ({ ...prev, softAcidic }))
        }
      />
      <ModalReviewSmell
        aroma={values.aroma}
        setAroma={(aroma) => setValues((prev) => ({ ...prev, aroma }))}
      />
      <Button>리뷰 남기기</Button>
    </div>
  );
}
