// gnb/Skeleton.tsx

const Skeleton = ({
  width = "w-16",
  height = "h-16",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${width} ${height} rounded-full ${className}`}
  ></div>
);

export default Skeleton;
