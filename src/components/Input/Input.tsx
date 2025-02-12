"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  isErrored?: boolean;
  id?: string;
}

export default function Input({
  type = "text",
  isErrored = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={`w-full h-[42px] md:h-[48px] py-[14px] px-[20px] rounded-2xl border focus:border-purple-100 focus:outline-none placeholder:text-gray-500 text-md-14px-regular md:text-lg-16px-regular text-black${
        isErrored ? "border-red-500" : "border-gray-300"
      } ${className}`}
      {...props}
    />
  );
}
