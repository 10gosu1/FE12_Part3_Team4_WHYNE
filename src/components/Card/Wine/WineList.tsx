"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWines, createWine } from "@/lib/api/newWine"; // 🛑 수정함
import { useAuth } from "@/context/AuthProvider";
import WineCard from "./WineCard";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import Icon from "@/components/Icon/Icon";
import { showToast } from "@/components/Toast/Toast";
import ModalFilter from "@/components/Modal/ModalFilter/ModalFilter";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: { content: string } | undefined;
};

export default function WineList() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedType, setSelectedType] = useState<
    "RED" | "WHITE" | "SPARKLING" | "ALL"
  >("ALL");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<
    "추천순" | "많은 리뷰" | "높은 가격순" | "낮은 가격순"
  >("추천순");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ useCallback을 사용하여 loadWines 함수 메모이제이션 🛑 수정함
  const loadWines = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWines({
        limit: 1000,
        type: selectedType === "ALL" ? undefined : selectedType,
        minPrice,
        maxPrice,
      });

      const [minRating, maxRating] =
        selectedRating !== "all"
          ? selectedRating.split("-").map((r) => parseFloat(r.trim()))
          : [0, 5];

      console.log("🎯 선택한 평점 필터:", { minRating, maxRating });

      const filtered = response.list.filter((wine: Wine) => {
        const avgRating = wine.avgRating ?? 0;
        const roundedRating = Math.round(avgRating * 10) / 10;
        return roundedRating >= minRating && roundedRating <= maxRating;
      });

      setWines(filtered);
    } catch (error) {
      console.error("⚠️ 와인 목록을 불러오지 못했습니다.", error);
      setError("와인 목록을 가져올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [selectedType, minPrice, maxPrice, selectedRating]);


  useEffect(() => {
    loadWines();
  }, [loadWines]); // 의존성 배열에 loadWines 추가

  // ✅ 와인 추가 후 리스트 업데이트
  const handleAddWine = async (wineData: {
    id?: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: "RED" | "WHITE" | "SPARKLING";
    avgRating?: number; // ✅ avgRating을 optional로 정의
  }) => {
    if (!user) {
      showToast("로그인이 필요합니다.", "error");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, avgRating, ...validWineData } = wineData;

      // ✅ API 요청 데이터 확인 (id, avgRating 없는지 체크)
      console.log("📤 API 요청 데이터:", wineData);
      const createdWine = await createWine(validWineData);
      showToast("새로운 와인이 등록되었습니다.", "success");
      setWines((prevWines) => [
        {
          ...createdWine,
          avgRating: createdWine.avgRating || 0,
          reviewCount: createdWine.reviewCount || 0,
        },
        ...prevWines,
      ]);

      setIsModalOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ 와인 생성 중 오류 발생:", error);
        showToast(`❌ 와인 등록 실패: ${error.message}`, "error");
      } else {
        console.error("❌ 알 수 없는 오류 발생", error);
        showToast("❌ 알 수 없는 오류가 발생했습니다.", "error");
      }
    }
  };

  // ✅ 검색 필터 적용
  const filteredWines = wines.filter((wine) =>
    wine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ 정렬 기능 적용
  const sortedWines = [...filteredWines].sort((a, b) => {
    switch (sortOption) {
      case "많은 리뷰":
        return b.reviewCount - a.reviewCount;
      case "높은 가격순":
        return b.price - a.price;
      case "낮은 가격순":
        return a.price - b.price;
      case "추천순":
      default:
        return b.avgRating - a.avgRating;
    }
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsFilterOpen(false),
    onSwipedRight: () => setIsFilterOpen(false),
    trackMouse: true,
  });

  return (
    <div className="flex flex-col md:flex-row gap-10 md:p-4 md:p-8">
      {/* ✅ 왼쪽 필터 영역 */}
      {!isMobile && (
        <div className="w-[260px] flex flex-col gap-6 mt-[130px]">
          <WineTypeSelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <PriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <RatingFilter
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          {/* ✅ 로그인한 경우에만 버튼 표시 */}
          {user && (
            <button
              className="px-4 py-2 bg-[#6A42DB] text-white rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              와인 등록하기
            </button>
          )}
        </div>
      )}

      {/* ✅ 검색창 & 정렬 옵션 */}
      <div className="md:flex-1 flex flex-col justify-center gap-6">
        <div className="relative w-[343px] sm:w-[700px] xl:w-[800px] mx-auto">
          <Icon
            name="search"
            size={24}
            className="absolute left-[23px] top-[30px] transform -translate-y-1/2 text-gray-500 scale-150"
          />
          <input
            type="text"
            placeholder="와인을 검색해 보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        {isMobile && (
          <button
            className="ml-5 sm:ml-2 md:p-2 w-fit text-white rounded-lg flex items-center justify-center"
            onClick={() => setIsFilterOpen(true)}
          >
            <Image
              src="/images/common/Group 107.png"
              alt="모달 버튼"
              width={48}
              height={48}
              className=" w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] object-cover" // 이미지 크기 조정
              priority
              unoptimized
            />
          </button>
        )}
        {isFilterOpen && (
          <div
            {...handlers}
            className="fixed inset-0 bg-white flex flex-col md:hidden z-50 w-full h-full overflow-y-auto"
          >
            <ModalFilter
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>
        )}

        {/* ✅ 정렬 필터 */}
        <div className="flex space-x-6 text-gray-500 text-sm md:text-lg justify-end mr-9">
          {["많은 리뷰", "높은 가격순", "낮은 가격순", "추천순"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setSortOption(option as typeof sortOption)}
                className={`${sortOption === option ? "text-black font-bold" : ""}`}
              >
                {option}
              </button>
            )
          )}
        </div>

        {/* ✅ 와인 리스트 */}
        <div className="grid grid-cols-1 mx-auto gap-[62px]">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : sortedWines.length > 0 ? (
            sortedWines.map((wine) => <WineCard key={wine.id} wine={wine} />)
          ) : (
            <div className="text-gray-500 text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* ✅ 와인 추가 모달 */}
      <ModalWineAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddWine}
        isEditMode={false}
      />

      {isMobile && (
        <div className=" inset-0 flex flex-col items-center justify-end md:hidden z-50 pointer-events-auto">
          {/* ✅ 필터 모달 */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalFilter
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </div>
          )}

          {/* ✅ 와인 등록하기 버튼 (하단 고정) */}
          {isMobile && !isFilterOpen && user && !isModalOpen && (
            <button
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] py-3 bg-[#6A42DB] text-white rounded-xl z-50"
              onClick={() => setIsModalOpen(true)}
            >
              와인 등록하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
