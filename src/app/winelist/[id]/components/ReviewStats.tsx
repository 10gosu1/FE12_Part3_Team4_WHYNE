import { useEffect, useState } from "react";
import ModalReviewAdd from "@/components/Modal/ModalReviewAdd/ModalReviewAdd";
import Button from "@/components/Button/button";
import { fetchWineById } from "@/lib/api/wine";
import StarRating from "@/components/Modal/ModalReviewAdd/components/StarRating";

type ReviewStatsProps = {
  wineId: number;
};

export default function ReviewStats({ wineId }: ReviewStatsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statValues, setStatValues] = useState<{
    avgRating: number;
    reviewCount: number;
    avgRatings: Record<number, number>;
  }>({
    avgRating: 0,
    reviewCount: 0,
    avgRatings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  useEffect(() => {
    fetchWineById(wineId)
      .then(setStatValues)
      .catch((error) => {
        console.log(error);
      });
  }, [wineId]);

  const maxReviewCount = Math.max(...Object.values(statValues.avgRatings), 1);

  return (
    <div className="flex flex-col md:flex-row lg:flex-col lg:flex-col-reverse gap-[30px] md:gap-[80px] lg:gap-[30px]">
      <div className="flex items-center justify-between md:flex-col">
        {/* 리뷰 평균점수 및 별점 */}
        <div className="flex gap-5 items-center">
          <p className="text-[54px] font-extrabold text-[#2D3034]">
            {statValues.avgRating.toFixed(1)}
          </p>
          <div className="flex flex-col gap-1">
            <StarRating rating={statValues.avgRating} />
            <p className="text-[14px] font-normal text-gray-500">{`${statValues.reviewCount.toLocaleString("ko-KR")}개의 후기`}</p>
          </div>
        </div>

        {/* 모달 버튼 */}
        <div className="lg:self-start">
          <Button
            size="sm"
            variant="modal"
            onClick={() => setIsModalOpen(true)}
          >
            리뷰 남기기
          </Button>
          <ModalReviewAdd
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      {/* 점수별 리뷰 개수 막대 그래프 */}
      <div className="flex flex-col gap-4 md:w-full">
        {[5, 4, 3, 2, 1].map((score) => {
          const reviewCount = statValues.avgRatings[score] || 0;
          const barWidth = (reviewCount / maxReviewCount) * 100;

          return (
            <div key={score} className="flex items-center">
              <span className="text-sm font-medium text-gray-500 flex-shrink-0 w-[40px] text-left">
                {score}점
              </span>
              <div className="w-full bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
