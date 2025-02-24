import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { logIn } from "@/lib/api/newAuth"; // 외부 API 호출 함수
import { JWT } from "next-auth/jwt";

// User 타입 확장
interface CustomUser extends NextAuthUser {
  accessToken?: string;
  refreshToken?: string;
}

export const authOptions: NextAuthOptions = {
  debug: true, // 디버깅 활성화
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // credentials 확인
        console.log("로그인 요청 - credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("이메일 또는 비밀번호가 없습니다.");
          throw new Error("이메일과 비밀번호를 입력하세요.");
        }

        try {
          const { accessToken, refreshToken, user } = await logIn(credentials.email, credentials.password);

          console.log("로그인 응답 - accessToken:", accessToken);
          console.log("로그인 응답 - refreshToken:", refreshToken);
          console.log("로그인 응답 - user:", user);

          if (user) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.nickname,
              image: user.image || undefined,
              accessToken,
              refreshToken,
            } as CustomUser;
          } else {
            console.error("유저 정보가 없습니다.");
            throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
          }
        } catch (error) {
          console.error("인증 오류:", error);
          throw new Error("서버 오류로 인증을 처리할 수 없습니다.");
        }
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("세션 시작 - session:", session);
      console.log("세션 시작 - token:", token);

      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.picture as string | undefined,
        };
      }
      
      console.log("세션 업데이트 후 - session:", session);
      
      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      console.log("JWT 생성 시작 - token:", token);
      if (user) {
        console.log("새로운 사용자 정보:", user);

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      console.log("JWT 생성 후 - token:", token);
      
      return token;
    },
  },

  pages: {
    signIn: "/signin", // 로그인 페이지
  },

  secret: process.env.NEXTAUTH_SECRET, // 비밀 키
  session: {
    strategy: "jwt", // JWT 방식으로 세션 관리
  },
};

export default NextAuth(authOptions);
