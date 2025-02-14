"use client";

import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import FlavorSlider from "@/components/Card/Flavor/FlavorSlider";
import ModalFilter from "@/components/Modal/ModalFilter/ModalFilter";
import { useState } from "react";
import MonthlyChart from "@/components/Card/Monthly/MonthlyChart";
import WineList from "@/components/Card/Wine/WineList";

export default function KyungsuTest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-gray-500">
      <div>
        <WineTypeSelector />
        <PriceSlider />
        <RatingFilter />
      </div>
      <div>
        <FlavorSlider />
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        모달 열기
      </button>
      <ModalFilter isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="bg-slate-400">
        <MonthlyChart />
      </div>
      <div className="flex justify-center">
        <WineList />
      </div>
    </div>
  );
}
