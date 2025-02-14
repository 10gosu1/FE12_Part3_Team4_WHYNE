"use client";

import { ReactNode } from "react";

interface CardTextProps {
  children: ReactNode;
  className?: string;
}

const CardText = ({ children, className }: CardTextProps) => {
  return <p className={className}>{children}</p>;
};

export default CardText;
