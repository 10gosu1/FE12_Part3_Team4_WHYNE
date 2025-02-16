"use client";
import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";
import ModalReviewHeader from "./ModalReviewHeader";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWineById } from "@/lib/api/wine";
import { createReview, fetchReviewById, updateReview } from "@/lib/api/review";
import { AxiosError } from "axios";
import { showToast } from "@/components/Toast/Toast";

// 1.와인 리뷰에 필요한 값들을 상태값으로 정리.
// 2.(rating,content)값은 ModalReviewRate컴포넌트 / (lightBold, smoothTannic, drySweet, softAcidic)값은 ModalReviewFlavor 컴포넌트 / (aroma[])값은 ModalReviewSmell 컴포넌트
// 3. 각 컴포넌트에서 값을 전달 받아 최종적으로 ModalReviewForm 컴포넌트에서 POST요청을 할 수 있도록 설계.

// 상태값들은 깊어야 2단계정도 prop으로 내려주기 때문에 context사용은 보류 3단계면 사용해야 한다고 판단.
// 리팩토링때 좀 더 쉬운 방법 고안.

type ReviewData = {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId?: number;
};

type ModalReviewFormProps = {
  onClose: () => void;
  onSuccess: (newReviewId: number) => void;
  initialReviewId?: number;
};

export default function ModalReviewForm({
  onClose,
  onSuccess,
  initialReviewId,
}: ModalReviewFormProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number | null>(
    initialReviewId ?? null
  );
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

  const { id } = useParams();
  const wineId = Array.isArray(id) ? id[0] : id;

  // 버튼 비활성화
  const disabled = !(values.rating && values.content);

  // 기존 리뷰 데이터를 가져오는 함수
  const fetchReviewData = useCallback(
    async (reviewId: number) => {
      if (!reviewId || !isEditMode) return;
      try {
        const response = await fetchReviewById(reviewId);
        console.log("기존리뷰 데이터 가져오기:", response);

        setValues({
          rating: response.rating,
          content: response.content,
          lightBold: response.lightBold,
          smoothTannic: response.smoothTannic,
          drySweet: response.drySweet,
          softAcidic: response.softAcidic,
          aroma: response.aroma,
          wineId: response.wineId,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "수정하기 위해 기존 리뷰데이터 불러오기 실패:",
            error.response?.data
          );
        }
      }
    },
    [isEditMode]
  );

  useEffect(() => {
    const fetchWine = async () => {
      try {
        if (!wineId) return;
        const response = await fetchWineById(wineId);
        const { id, name, image } = response;
        setWine({ id, name, image });
      } catch (error) {
        console.error("와인 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchWine();
  }, [wineId, reviewId]);

  useEffect(() => {
    if (reviewId && isEditMode) {
      fetchReviewData(reviewId);
    }
  }, [reviewId, isEditMode, fetchReviewData]);

  useEffect(() => {
    if (initialReviewId) {
      setReviewId(initialReviewId);
      setIsEditMode(true);
    }
  }, [initialReviewId]);

  const onSubmit = async () => {
    if (!wine.id || wine.id === 0) {
      alert("와인 정보를 불러오는 중입니다. 잠시만 기다려 주세요.");
      return;
    }
    const reviewData: ReviewData = {
      rating: values.rating,
      lightBold: values.lightBold,
      smoothTannic: values.smoothTannic,
      drySweet: values.drySweet,
      softAcidic: values.softAcidic,
      aroma: values.aroma,
      content: values.content,
    };

    if (!isEditMode) {
      reviewData.wineId = Number(wine.id);
    }

    try {
      let response;
      if (isEditMode) {
        // 수정 요청 PATCH
        response = await updateReview(reviewId!, reviewData);
        showToast("리뷰가 수정되었습니다.", "success");
      }
      if (!isEditMode && reviewData.wineId !== undefined) {
        response = await createReview({
          ...reviewData,
          wineId: reviewData.wineId,
        });
        showToast("리뷰가 성공적으로 등록되었습니다.", "success");
      }
      onClose();
      onSuccess(response.id);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <ModalReviewHeader isEditMode={isEditMode} onClose={onClose} />
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
      <Button
        disabled={disabled}
        onClick={onSubmit}
        size="lg"
        className="w-full"
      >
        {isEditMode ? "리뷰 수정하기" : "리뷰 남기기"}
      </Button>
    </div>
  );
}
