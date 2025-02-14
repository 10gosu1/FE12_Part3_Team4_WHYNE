"use client";

import Link from "next/link";

export default function WineAdd() {
  return (
    <>
      <div className="flex justify-center gap-4 mt-6">
        {/* 와인 등록 모드 링크 */}
        <Link
          href="/test/wineadd/modalwineaddmode"
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          와인 등록 모드
        </Link>

        {/* 와인 수정 모드 링크 */}
        <Link
          href="/test/wineadd/modalwineeditmode"
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          와인 수정 모드
        </Link>
      </div>
    </>
  );
}
