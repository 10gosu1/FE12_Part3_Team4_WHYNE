"use client";

import { useEffect, useState } from "react";
import { fetchWines, createWine } from "@/lib/api/wine";
import { useAuth } from "@/context/AuthProvider"; // ✅ 로그인 정보 사용
import WineCard from "./WineCard";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";
import ModalWineAdd from "@/components/Modal/ModalWineAdd/ModalWineAdd";
import Icon from "@/components/Icon/Icon";

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

  // ✅ 필터 상태
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

  const { user } = useAuth(); // ✅ 사용자 로그인 정보 가져오기

  // ✅ 와인 목록 가져오기
  // ✅ 와인 목록 가져오기
  useEffect(() => {
    async function getWines() {
      setLoading(true);
      try {
        const response = await fetchWines({
          limit: 1000,
          type: selectedType === "ALL" ? undefined : selectedType,
          minPrice,
          maxPrice,
          rating:
            selectedRating !== "all"
              ? parseFloat(selectedRating.split("-")[0])
              : undefined,
        });

        const [minRating, maxRating] =
          selectedRating !== "all"
            ? selectedRating.split("-").map(parseFloat)
            : [0, 5];

        console.log("🎯 선택한 평점 필터:", { minRating, maxRating });

        const filtered = response.list.filter((wine: Wine) => {
          const avgRating = wine.avgRating ?? 0; // ✅ 기본값 0 처리
          const roundedRating = Math.floor(avgRating * 10) / 10; // ✅ 소수점 1자리까지만 비교
          console.log(
            `📊 비교: ${wine.name} | avgRating: ${roundedRating}, min: ${minRating}, max: ${maxRating}`
          );

          return roundedRating >= minRating && roundedRating <= maxRating;
        });

        setWines(filtered);
      } catch (error) {
        console.error("⚠️ 와인 목록을 불러오지 못했습니다.", error);
        setError("와인 목록을 가져올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }
    getWines();
  }, [selectedType, minPrice, maxPrice, selectedRating]);

  // ✅ 와인 추가 (모달에서 등록)
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
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // ✅ 불필요한 id, avgRating 제거
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, avgRating, ...validWineData } = wineData;

      // ✅ API 요청 데이터 확인 (id, avgRating 없는지 체크)
      console.log("📤 API 요청 데이터:", wineData);
      const createdWine = await createWine(validWineData);
      alert("🍷 새로운 와인이 등록되었습니다.");
      setWines((prevWines) => [
        {
          ...createdWine,
          avgRating: createdWine.avgRating || 0,
          reviewCount: createdWine.reviewCount || 0,
        },
        ...prevWines,
      ]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ 와인 생성 중 오류 발생:", error);
      alert("❌ 와인 등록 실패. 다시 시도해 주세요.");
    }
  };

  const filteredWines = wines.filter((wine) => {
    const matchesSearch = wine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesRating = true;
    if (selectedRating !== "all") {
      const [minRating, maxRating] = selectedRating
        .split("-")
        .map((r) => parseFloat(r.trim())); // ✅ `parseFloat()` 적용
      const wineRating =
        wine.avgRating !== null && wine.avgRating !== undefined
          ? parseFloat(wine.avgRating.toFixed(1))
          : null;

      console.log(
        `📊 필터링 비교: ${wine.name} | avgRating: ${wineRating}, min: ${minRating}, max: ${maxRating}`
      );

      matchesRating =
        wineRating !== null &&
        wineRating >= minRating &&
        wineRating <= maxRating; // ✅ `<=` 수정
    }

    return matchesSearch && matchesRating;
  });

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

  return (
    <div className="flex gap-10 p-8">
      {/* ✅ 왼쪽 필터 영역 */}
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

      {/* ✅ 검색창 & 정렬 옵션 */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative w-[800px]">
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
            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A42DB]"
          />
        </div>

        {/* ✅ 정렬 필터 */}
        <div className="flex space-x-6 text-gray-500 text-lg justify-end">
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
        <div className="grid grid-cols-1 gap-[62px]">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : sortedWines.length > 0 ? (
            sortedWines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={{
                  ...wine,
                  avgRating: parseFloat(wine.avgRating.toFixed(1)), // ✅ 소수점 1자리까지 표시
                }}
              />
            ))
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
    </div>
  );
}
