export interface CustomUser {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    accessToken?: string;
    refreshToken?: string;
  }
  
  // CustomSession 타입을 정의합니다.
  import { Session } from "next-auth";
  
  export interface CustomSession extends Session {
    user: CustomUser; // user 타입을 CustomUser로 확장
  }
