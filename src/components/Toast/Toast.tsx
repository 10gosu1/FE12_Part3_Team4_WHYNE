"use client";
import { toast as sonnerToast } from "sonner";
import clsx from "clsx";

type ToastType = "success" | "error" | "info";

export const showToast = (message: string, type: ToastType = "info") => {
  sonnerToast.custom(() => (
    <div
      className={clsx(
        "flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-lg",
        "text-white text-lg font-medium",
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
