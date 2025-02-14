"use client";

interface AromaTagProps {
  tags: string[]; // API에서 가져온 태그 목록
  className?: string;
}

const AromaTag = ({ tags, className }: AromaTagProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-800 text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default AromaTag;
