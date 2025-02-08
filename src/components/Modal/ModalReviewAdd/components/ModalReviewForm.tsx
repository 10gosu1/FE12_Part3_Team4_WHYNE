"use client";
import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// 1.와인 리뷰에 필요한 값들을 상태값으로 정리.
// 2.(rating,content)값은 ModalReviewRate컴포넌트 / (lightBold, smoothTannic, drySweet, softAcidic)값은 ModalReviewFlavor 컴포넌트 / (aroma[])값은 ModalReviewSmell 컴포넌트
// 3. 각 컴포넌트에서 값을 전달 받아 최종적으로 ModalReviewForm 컴포넌트에서 POST요청을 할 수 있도록 설계.

// 상태값들은 깊어야 2단계정도 prop으로 내려주기 때문에 context사용은 보류 3단계면 사용해야 한다고 판단.
// 리팩토링때 좀 더 쉬운 방법 고안.

type ModalReviewFormProps = {
  onClose: () => void;
};

export default function ModalReviewForm({ onClose }: ModalReviewFormProps) {
  const [wine, setWine] = useState<{
    id: number;
    name: string;
    image: string;
  }>({
    id: 0,
    name: "",
    image: "",
  });
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
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const response = await axios.get("/");
        const { id, name, image } = response.data;
        setWine({ id, name, image });
      } catch (error) {
        console.error("와인 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchWine();
  }, [id]);

  const onSubmit = () => {
    alert("임시로 post요청 완료!");
    onClose();
  };

  return (
    <div className="flex flex-col gap-10">
      <ModalReviewRate
        rating={values.rating}
        setRating={(rating) => setValues((prev) => ({ ...prev, rating }))}
        content={values.content}
        setContent={(content) => setValues((prev) => ({ ...prev, content }))}
        name={wine.name}
        image={wine.image}
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
      <Button onClick={onSubmit} size="lg" className="w-full">
        리뷰 남기기
      </Button>
    </div>
  );
}
