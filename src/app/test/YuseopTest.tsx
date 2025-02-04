import Button from "@/components/Button/button";

export default function YuseopTest() {
  return (
    <div className="flex flex-col gap-6">
      {/* ✅ 소셜 로그인 버튼 */}
      <div className="flex flex-col gap-4">
        <Button variant="social" className="w-[400px] h-[52px]">
          Google로 시작하기
        </Button>
        <Button variant="social" className="w-[400px] h-[52px]">
          Kakao로 시작하기
        </Button>
        <Button variant="social" className="w-[303px] h-[48px]">
          Google로 시작하기
        </Button>
        <Button variant="social" className="w-[303px] h-[48px]">
          Kakao로 시작하기
        </Button>
      </div>

      {/* ✅ 일반 버튼 */}
      <div className="flex flex-col gap-4">
        <Button variant="button" className="w-[400px] h-[50px]">
          가입하기
        </Button>
        <Button variant="button" className="w-[343px] h-[48px]">
          가입하기
        </Button>
      </div>

      {/* ✅ 모달 버튼 */}
      <div className="flex flex-col gap-4">
        <Button variant="modal" className="w-[113px] h-[42px]">
          링크 보내기
        </Button>
        <Button variant="modalCancel" className="w-[68px] h-[42px]">
          취소
        </Button>
      </div>
    </div>
  );
}
