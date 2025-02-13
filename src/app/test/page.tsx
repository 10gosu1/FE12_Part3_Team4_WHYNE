//import HoyoungTest from "./HoyoungTest";
import HyeseonTest from "./HyeseonTest";
import KyungsuTest from "./KyungsuTest";
import GiyeonTest from "./GiyeonTest";
import YuseopTest from "./YuseopTest";
import { AuthProvider } from "@/context/AuthProvider";

export default function TestPage() {
  return (
    <AuthProvider>
      <div className="p-10 space-y-12">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          🚀 팀원별 공통 컴포넌트 테스트 페이지
        </h1>

        {/* ✅ 호영 테스트 영역 */}
        <section className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-600">
            🟪 호영 테스트
          </h2>
          {/* <HoyoungTest /> */}
        </section>

        {/* ✅ 혜선 테스트 영역 */}
        <section className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600">
            🟦 혜선 테스트
          </h2>
          <HyeseonTest />
        </section>

        {/* ✅ 경수 테스트 영역 */}
        <section className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-green-600">
            🟩 경수 테스트
          </h2>
          <KyungsuTest />
        </section>

        {/* ✅ 기연 테스트 영역 */}
        <section className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-red-600">🟥 기연 테스트</h2>
          <GiyeonTest />
        </section>

        {/* ✅ 유섭 테스트 영역 */}
        <section className="p-6 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-600">
            🟨 유섭 테스트
          </h2>
          <YuseopTest />
        </section>
      </div>
    </AuthProvider>
  );
}
