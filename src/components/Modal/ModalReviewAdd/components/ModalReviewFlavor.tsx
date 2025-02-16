import FlavorSlider from "@/components/Card/Flavor/FlavorSlider";

type ModalReviewFlavorProps = {
  lightBold: number;
  setLightBold: (value: number) => void;
  smoothTannic: number;
  setSmoothTannic: (value: number) => void;
  drySweet: number;
  setDrySweet: (value: number) => void;
  softAcidic: number;
  setSoftAcidic: (value: number) => void;
};

export default function ModalReviewFlavor({
  lightBold,
  setLightBold,
  smoothTannic,
  setSmoothTannic,
  drySweet,
  setDrySweet,
  softAcidic,
  setSoftAcidic,
}: ModalReviewFlavorProps) {
  return (
    <div className="flex flex-col w-full gap-6">
      <p className="text-xl-20px-bold">와인의 맛은 어땠나요?</p>
      <FlavorSlider
        lightBold={lightBold}
        setLightBold={setLightBold}
        smoothTannic={smoothTannic}
        setSmoothTannic={setSmoothTannic}
        drySweet={drySweet}
        setDrySweet={setDrySweet}
        softAcidic={softAcidic}
        setSoftAcidic={setSoftAcidic}
      />
    </div>
  );
}
