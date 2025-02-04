import { IconData } from "./IconData";

/**
 *
 * @param {object} props
 * @param {string} props.name - 아이콘 이름
 * @param {number} props.size - 아이콘 크기 (기본값 24)
 * @param {object} props.onClick - 클릭시 이벤트 발생
 *
 * @example
 * // 아이콘 크기 변경
 * <Icon name="apple" size={40} />
 *
 * //아이콘 색상 변경
 * <Icon name="apple" size={40} className="text-red-500" />
 *
 * @example
 * // 아이콘 클릭 이벤트 추가
 * <Icon name="apple" size={24} onClick={changeColor} />
 */

type IconProps = {
  name: keyof typeof IconData;
  size: number;
  className?: string;
  onClick?: () => void;
};

export default function Icon({
  name,
  size = 24,
  className,
  onClick,
}: IconProps) {
  const icon = IconData[name];
  if (!icon) {
    console.warn(`${name}은 없는 아이콘입니다.`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-current ${className}`}
      onClick={onClick}
    >
      {icon}
    </svg>
  );
}
