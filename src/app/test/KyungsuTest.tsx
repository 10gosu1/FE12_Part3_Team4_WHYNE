import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";
import WineTypeSelector from "@/components/filter/WineTypeSelector";

export default function KyungsuTest() {
  return (
    <div className="text-gray-500">
      <WineTypeSelector />
      <PriceSlider />
      <RatingFilter />
      
    </div>
  )
}

