"use client";
import { toast as sonnerToast } from "sonner";
import clsx from "clsx";

type ToastType = "success" | "error" | "info";

/**
 * 추가 하고싶은 내용이 있으면 추가해서 사용하시면 됩니다.
 * 사용법:
 * 1.사용하고자 하는 페이지 layout에 winelist/[id]/layout.tsx파일에 있는 것처럼
 *   토스트를 import하고 <Toaster />컴포넌트를 넣어주면 됩니다.
 *
 * 2. import해서 메시지와 타입을 매개변수로 넣어주면 끝
 * showToast("리뷰가 성공적으로 등록되었습니다.", "success");
 *
 */

export const showToast = (message: string, type: ToastType = "info") => {
  sonnerToast.custom(() => (
    <div
      className={clsx(
        "flex items-center gap-3 p-3 rounded-lg shadow-lg max-w-lg",
        "text-white text-md font-medium",
        {
          "bg-green-500": type === "success",
          "bg-red-500": type === "error",
          "bg-blue-500": type === "info",
        }
      )}
    >
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white bg-opacity-20">
        {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </span>
      <span>{message}</span>
    </div>
  ));
};
