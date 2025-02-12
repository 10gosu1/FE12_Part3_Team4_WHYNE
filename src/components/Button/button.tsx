"use client";

/**
 * ✅ 공통 버튼 컴포넌트
 * - `variant`: 버튼의 스타일 지정
 * - `size`: 버튼의 크기 지정 (sm, lg)
 * - `disabled`: 버튼 비활성화 여부
 * - `className`: 추가적인 Tailwind 스타일 적용 가능
 */
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "button" | "social" | "modal" | "modalCancel";
  size?: "sm" | "lg";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant,
  size = "sm",
  disabled = false,
  className,
}: ButtonProps) {
  /**
   * - 공통적으로 적용되는 스타일
   * - 트랜지션 효과 (transition duration-200)
   * - 플렉스 박스 정렬 (flex items-center justify-center)
   * - 팀의 Tailwind 설정을 반영한 폰트 적용 (text-lg-16px-bold)
   */
  const baseStyles =
    "flex justify-center items-center text-lg-16px-bold text-center transition duration-200 whitespace-nowrap";

  const variantStyles = {
    button: "bg-purple-100 text-white hover:bg-purple-10",
    social: "bg-white text-black border border-gray-300 flex gap-2 px-4 py-2",
    modal: "bg-purple-100 text-white hover:bg-purple-10",
    modalCancel:
      "bg-white text-gray-500 border border-gray-300 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "w-[100px] h-[40px] px-[12px] py-[10px] gap-[10px] rounded-[12px]",
    lg: "w-[400px] h-[50px] px-[172px] py-[16px] gap-[10px] rounded-[16px]",
  };
  const variantClass = variantStyles[variant || "button"];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variantClass} 
        ${sizeStyles[size]} 
        ${className || ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}
