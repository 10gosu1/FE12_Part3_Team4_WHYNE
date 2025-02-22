# 🍷 WHYNE

사용자가 다양한 와인에 대한 리뷰를 보고, 구매 여부를 판단해볼 수 있는 플랫폼입니다.
<br><br>

> Codeit Sprint FE 12기 - Part3 4팀<br>
> 배포 URL : https://fe-12-part3-team4-whyne.vercel.app/<br>
> Copyright 2024 코드잇 Inc. All rights reserved.

<br>

## 🕰️ 개발기간

**25.02.03 - 25.02.19**
<br><br>

## 💫 팀원소개

| ![title](https://avatars.githubusercontent.com/u/184485799?v=4) | ![title](https://avatars.githubusercontent.com/u/181333658?v=4) | ![title](https://avatars.githubusercontent.com/u/119279127?v=4) | ![title](https://avatars.githubusercontent.com/u/184471517?v=4)         |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **<center>[🔗 이유섭](https://github.com/charie95)</center>**   | **<center>[🔗 서경수](https://github.com/10gosu1)</center>**    | **<center>[🔗 남기연](https://github.com/Namgyeon)</center>**   | **<center>[🔗 김혜선](https://github.com/llllliii88iiilllll)</center>** |

<br><br>

## 🖥️ 프론트엔드 개발 환경

**⚒️ 기술 스택**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br><br>
**🧑‍🤝‍🧑 협업툴**
<br><br>
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
<br><br>
**🧑‍💻 개발 툴**

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br><br>
**🚀 배포**

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br><br>

## 📍 팀원별 역할 분담

- 공용 컴포넌트 제작 -> 페이지 제작 -> 오류 테스트 -> 발표 자료 준비

### 👨‍💻 이유섭

- 프로젝트 전반적인 관리
- 발표 자료 준비
- 페이지 : 마이 프로필
- 공용 컴포넌트 : Button, Modal - 투버튼, Card - my, Card - review
- 기능
  - axios 이용한 api 추상화
  - 내가 작성한 후기, 내가 등록한 와인 탭 클릭시 각 항목에 맞는 카드 리스트 출력
  - 각 항목의 카드의 케밥 버튼 클릭 시 수정, 삭제하기 기능

### 👨‍💻 서경수

- git, vercel 관리
- 발표 자료 준비
- 페이지 : 메인 랜딩 페이지, 와인 목록 페이지
- 공용 컴포넌트 : Modal -필터, Filter, Floavor, Card - wine, Card - monthly
- 기능
  - 상단 추천 와인 랜덤 출력
  - 와인 목록 검색 기능
  - 타입, 가격, 별점으로 와인을 필터링
  - 와인 카드를 클릭시 해당 와인의 상세 페이지로 이동
  - 와인 맛, 향을 입력 기능
  - 초기값으로 와인 전체 타입도 볼 수 있게 수정

### 🧑‍💻 남기연

- 발표 자료 준비
- 페이지 : 와인 상세 페이지
- 공용 컴포넌트 : Modal - 리뷰 등록/ 수정, Icon, Card - mylist, Card - detail
- 기능
  - 아이콘 컴포넌트 화
  - 와인 상세 정보와 리뷰 목록 출력
  - 리뷰 등록/수정 클릭시 리뷰 등록/수정 기능을 가진 모달 생성
  - 리뷰 수정시, 날짜 입력 옆에 "(수정됨)" 텍스트 추가
  - 기본 alert 창 대신 toast 기능 구현

### 👩‍💻 김혜선

- 발표 자료 준비 및 발표
- 페이지 : 로그인, 회원가입 페이지
- 공용 컴포넌트 : Gnb, Input, Dropdown, Modal - 와인 등록/ 수정
- 기능
  - Gnb에서 사용자 로그인 상태에 따라 다른 값 출력
  - 로그인, 회원가입 유효성 검사
  - 카카오 로그인 연결
  - 와인 등록/수정 클릭시 와인 등록/수정 기능을 가진 모달 생성
  - 마이프로필 : 프로필 사진, 닉네임 수정 기능
    <br><br>

## 👀 프로젝트 미리보기

### 1. 메인 렌딩 페이지 (/)
![1 (3)](https://github.com/user-attachments/assets/c06c1937-6117-425e-ada9-47ff59498177)

<br><br>

### 2. 로그인 페이지 (/signin)
![2 (2)](https://github.com/user-attachments/assets/b3fbae50-7662-496b-b7b5-c948cc4ea4f1)

<br><br>

### 3. 회원가입 페이지 (/signup)
![3 (1)](https://github.com/user-attachments/assets/0263f9f5-47b9-48b7-9300-2bc4c6211e43)

<br><br>

### 4. 와인 목록 페이지 (/winelist)
![4 (1)](https://github.com/user-attachments/assets/9ccbbaf4-1859-4c61-b60b-ee42a76a9818)

<br><br>

### 5. 와인 상세 페이지 (/winelist/{windid})
![5 (1)](https://github.com/user-attachments/assets/325303f1-0086-475c-a627-5e5084e89a9f)

<br><br>

### 6. 내 프로필 페이지 (/myprofile)
![6 (1)](https://github.com/user-attachments/assets/c19559b6-c080-4049-b479-3a32588cb83e)

<br><br>
