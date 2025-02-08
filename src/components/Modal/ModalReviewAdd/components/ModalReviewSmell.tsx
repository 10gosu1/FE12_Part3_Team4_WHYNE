"use client";

type ModalReviewSmellProps = {
  aroma: string[];
  setAroma: (values: string[]) => void;
};

export default function ModalReviewSmell({
  aroma,
  setAroma,
}: ModalReviewSmellProps) {
  const smellTag = {
    체리: "CHERRY",
    베리: "BERRY",
    오크: "OAK",
    바닐라: "VANILLA",
    후추: "PEPPER",
    제빵: "BAKING",
    풀: "GRASS",
    사과: "APPLE",
    복숭아: "PEACH",
    시트러스: "CITRUS",
    트로피컬: "TROPICAL",
    미네랄: "MINERAL",
    꽃: "FLOWER",
    담뱃잎: "TOBACCO_LEAVES",
    흙: "SOIL",
    초콜릿: "CHOCOLATE",
    스파이스: "SPICE",
    카라멜: "CARAMEL",
    가죽: "LEATHER",
  };

  const toggleAroma = (value: string) => {
    const updatedAroma = aroma.includes(value)
      ? aroma.filter((item) => item !== value)
      : [...aroma, value];
    setAroma(updatedAroma);
  };
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl-20px-bold">기억에 남는 향이 있나요?</p>
      <div className="flex flex-row flex-wrap gap-[10px]">
        {Object.entries(smellTag).map(([name, value]) => (
          <button
            key={value}
            onClick={() => {
              toggleAroma(value);
            }}
            className={`px-[18px] py-[10px] border border-gray-300 rounded-full text-lg font-medium hover:bg-indigo-600 hover:text-white
              ${
                aroma.includes(value)
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-black"
              }
              `}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
