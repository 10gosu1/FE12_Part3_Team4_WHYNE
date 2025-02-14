"use client";

interface TabCountProps {
  count: number;
}

export default function TabCount({ count }: TabCountProps) {
  return <span className="tab-count">{count}</span>;
}
