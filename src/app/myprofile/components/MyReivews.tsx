import { useEffect, useState, useRef } from "react";
import { fetchMyReviews } from "@/lib/api/user";
import CardMyReview from "@/components/Card/CardMyReview/CardMyReview";
import Image from "next/image";

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface Wine {
  id: number;
  name: string;
  image?: string;
  avgRating?: number;
}

interface ReviewData {
  id: number;
  rating: number;
  wineName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  wine: Wine;
}

export default function MyReviews() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);

  useEffect(() => {
    if (!didFetch.current) {
      didFetch.current = true; // 첫 번째 실행만 허용
      loadMoreReviews();
    }
  }, []);

  const loadMoreReviews = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetchMyReviews(10, cursor);
      console.log("🟠 서버에서 받은 리뷰 목록:", response.list); //서버 응답 확인

      setReviews((prev: ReviewData[]) => {
        const existingIds = new Set(prev.map((review) => review.id));
        const newReviews = (response.list as ReviewData[])
          .filter((review) => !existingIds.has(review.id))
          .map((review) => ({
            ...review,
            wineName: review.wine?.name || "이름 없음",
            wineId: review.wine?.id,
          }));
        return [...prev, ...newReviews];
      });

      if (response.nextCursor === null) {
        setHasMore(false);
      } else {
        setCursor(response.nextCursor);
      }
    } catch (error) {
      console.error("❌ 리뷰 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!observerRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreReviews();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  /*삭제 성공 후 UI 업데이트 */
  const handleDeleteSuccess = (deletedReviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== deletedReviewId)
    );
  };

  console.log("🍷 첫 번째 리뷰의 wineId:", reviews[0]?.wine?.id);

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* 리뷰가 없을 때 이미지 표시 */}
      {reviews.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/common/review-empty.svg"
            alt="작성한 후기가 없습니다."
            width={200} // 원하는 크기로 조정
            height={200}
          />
          <p className="text-gray-500">작성한 후기가 없습니다.</p>
        </div>
      )}

      {/* 리뷰 목록 */}
      {reviews.map((review) => (
        <CardMyReview
          key={review.id}
          review={{
            ...review,
            wine: {
              id: review.wine?.id || 0, // ✅ 와인 ID가 없으면 기본값 0
              name: review.wine?.name || "이름 없음", // ✅ 와인 이름이 없으면 "이름 없음"
              image: review.wine?.image || "", // ✅ 와인 이미지가 없으면 빈 문자열
            },
          }}
          onDeleteSuccess={() => handleDeleteSuccess(review.id)}
        />
      ))}

      {loading && <p className="text-center text-gray-500">로딩 중...</p>}

      <div ref={observerRef} className="h-10" />
    </div>
  );
}
