"use client";

import { InputHTMLAttributes, useState, useEffect } from "react";
import Input from "./Input";
import Icon from "@/components/Icon/Icon";
import { IconData } from "@/components/Icon/IconData";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  isErrored?: boolean;
  id?: string;
}
export default function InputPassword({
  isErrored = false,
  ...props
}: InputPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const iconName: keyof typeof IconData = isPasswordVisible
    ? "visibility"
    : "unVisibility";

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    console.log("Password visibility changed:", isPasswordVisible);
  }, [isPasswordVisible]);

  return (
    <div className="flex items-center relative w-full">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        isErrored={isErrored}
        placeholder="영문, 숫자 포함 8자 이상"
        className={`w-full h-[42px] md:h-[48px] py-[14px] px-[20px] rounded-2xl border  focus:border-purple-100 focus:outline-none placeholder:text-gray-500 text-md-14px-regular md:text-lg-16px-regular ${
          isErrored ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      <Icon
        name={iconName}
        size={24}
        viewBox="0 0 24 24"
        className="absolute right-[20px] cursor-pointer text-gray-300"
        onClick={toggleVisibility}
      />
    </div>
  );
}
