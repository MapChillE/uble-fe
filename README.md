## 프로젝트 소개

| 항목           | 내용                             |
| -------------- | -------------------------------- |
| **프로젝트명** | Uble                  |
| **팀명**       | 맵칠이(MapChillE)                       |
| **주제**       | LG U+ 멤버십 제휴처 안내 지도 서비스 |
| **개발 기간**  | 2025.06.30 - 2025.08.08 |

## 서비스 소개


본 프로젝트는 LG유플러스 멤버십 회원의 혜택 이용률과 서비스 만족도를 높이기 위해 **네이버 지도 API를 기반**으로 위치 정보와 관심사 기반 추천 기능을 연계한 **제휴처 안내 서비스**를 제공한다.

사용자는 자신의 위치 혹은 사용자가 설정한 위치를 중심으로 주변 제휴처 매장을 손쉽게 탐색할 수 있으며, 이용 내역이나 즐겨찾기 내역을 바탕으로 **제휴처를 추천**받을 수 있다.
<br />

## 💡 기능 소개


### 카카오 소셜 로그인

- 카카오 계정 로그인

- accessToken: localStorage 저장

- refreshToken: cookie 저장

- 사용자 정보 수집: 멤버십 등급, 성별, 생년월일, 선호 카테고리 → 제휴처 추천 활용

### 즐겨찾는 위치 등록

- 자주 가는 위치 최대 2곳 지정

### 사용자 피드백 수집

- 마이페이지에서 서비스 피드백 작성 가능

### U+ 멤버십 바코드 등록

- 멤버십 바코드 등록 및 사용

- 저장 위치: Indexed DB

### 제휴처 지도

- 네이버 지도 API 활용한 지도 서비스 제공

- 현재 위치 기반 제휴처 마커 표시

### 제휴처 경로 안내

- 제휴처까지의 경로 안내 제공


### 제휴처 검색

- 제휴처 검색 기능

- 검색 시 검색창 하단에 추천 검색어 출력

### 사용자 추천 제휴처

- 사용자 기반 추천: 멤버십 등급, 성별, 나이, 선호 카테고리, 이용 내역

- 지도에서 추천 제휴처 위치 확인

### 제휴처 즐겨찾기

- 자주 찾는 제휴처 즐겨찾기 등록 가능

### 관리자

- 제휴사/카테고리/이용 내역 통계 시각화

- 사용자 피드백 열람


## 🏛️ 디렉토리 구조
**monorepo 구조**

```
uble-fe/
├── apps/                # 실제 서비스되는 앱(어드민, 사용자, 스토리북 등)
│   ├── admin/           # 관리자(어드민) 프론트엔드 앱
│   ├── storybook/       # UI 컴포넌트 개발/테스트용 스토리북 앱
│   └── user/            # 사용자(유저) 프론트엔드 앱
├── packages/            # 여러 앱에서 공통으로 사용하는 패키지(라이브러리) 모음
│   ├── api/             # API 연동 및 핸들러 관련 공통 코드
│   ├── eslint-config/   # ESLint(코드 스타일) 공통 설정
│   ├── tailwind-config/ # Tailwind CSS 공통 설정
│   ├── typescript-config/ # TypeScript 공통 설정
│   └── ui/              # 공통 UI 컴포넌트 라이브러리
├── package.json         # 루트 패키지 매니저 설정
├── pnpm-lock.yaml       # pnpm 패키지 매니저 lock 파일
├── pnpm-workspace.yaml  # pnpm 워크스페이스 설정
├── turbo.json           # Turborepo 빌드/캐시 설정
└── README.md            # 프로젝트 설명 파일
```

**user app**

```
apps/user/
├── certificates/      # 인증서 관련 폴더 (로컬 HTTPS 등)
├── mkcert/            # mkcert로 생성한 인증서 폴더 (로컬 개발용)
├── public/            # 정적 파일(이미지, 아이콘 등) 위치
├── src/               # 소스 코드 루트
│   ├── app/           # Next.js 라우트 및 페이지 폴더
│   │   ├── (main)/        # 메인 레이아웃 그룹(홈, 지도, 마이페이지 등)
│   │   └── (no-layout)/   # 별도 레이아웃 없는 페이지 그룹(로그인, 회원가입 등)
│   │ 
│   ├── components/    # 공통 컴포넌트 모음
│   ├── hooks/         # 커스텀 React 훅
│   │   └── map/           # 지도 관련 커스텀 훅
│   ├── lib/           # 라이브러리/유틸리티 함수
│   ├── service/       # API 서비스 함수
│   ├── store/         # 전역 상태 관리(예: Zustand 등)
│   ├── types/         # 타입스크립트 타입 정의
│   └── utils/         # 유틸리티 함수 모음
├── package.json       # 패키지 매니저 설정 파일
├── tsconfig.json      # 타입스크립트 설정 파일
└── ...                # 기타 설정 파일
```

## ⚙️ 서버 실행 방법

```bash
pnpm i
pnpm run dev
```



## ⚔️ 기술 스택

### **Monorepo & 패키지 관리**
  |  | 사용 기술                                                          | 역할                                        |
  |:-----------|:---------------------------------------------------------------|:------------------------------------------|
  |![pnpm](https://img.shields.io/badge/Turborepo-000000?style=flat)|Turborepo | 모노레포 관리 및 빌드/캐시 최적화
  |![pnpm](https://img.shields.io/badge/pnpm-000000?style=flat) | pnpm | 패키지 매니저 및 워크스페이스 관리


### 프론트엔드
  |  | 사용 기술                                                          | 역할                                        |
  |:-----------|:---------------------------------------------------------------|:------------------------------------------|
  |![React](https://img.shields.io/badge/React-61DAFB?style=flat\&logo=React\&logoColor=black)| React | UI 라이브러리      
  |![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat\&logo=Next.js\logoColor=white)| Next.js | React 기반 프레임워크 (App Router 구조)   
  |![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat\&logo=TypeScript\&logoColor=white)| TypeScript | 정적 타입 언어
  |![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat\&logo=TailwindCSS\&logoColor=white)| Tailwind CSS | 유틸리티 퍼스트 CSS 프레임워크
  |![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?style=flat\&logo=shadcn\&logoColor=white)| shadcn/ui | Tailwind 기반 UI 컴포넌트 컬렉션
  |![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white)| Storybook | UI 컴포넌트 개발 및 문서화
  


### **상태 관리 & 데이터**
  |  | 사용 기술                                                          | 역할                                        |
  |:-----------|:---------------------------------------------------------------|:------------------------------------------|
  |![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat\&logo=ReactQuery\&logoColor=white)| @tanstack/react-query | 서버 상태 관리 및 데이터 패칭
  |![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat) | Zustand | 클라이언트 상태 관리

### **코드 품질 & 협업**
  |  | 사용 기술                                                          | 역할                                        |
  |:-----------|:---------------------------------------------------------------|:------------------------------------------|
  |![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat\&logo=ReactQuery\&logoColor=white)| ESLint | 코드 스타일 및 린팅
  |![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat\&logo=Prettier\&logoColor=black) | Prettier | 코드 포매터
  |![Custom ESLint Config](https://img.shields.io/badge/Custom_ESLint_Config-000000?style=flat) | Custom ESLint Config | 모노레포 내 공통 린트 설정
  

### **기타**

  |  | 사용 기술                                                          | 역할                                        |
  |:-----------|:---------------------------------------------------------------|:------------------------------------------|
  |![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat\&logo=ReactQuery\&logoColor=white)| mkcert | 로컬 HTTPS 인증서 생성
  |![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat\&logo=Prettier\&logoColor=black) | Naver Map API | 지도 서비스(유저 앱)
  |![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat\&logo=KakaoTalk\&logoColor=black) | Kakao Login | 소셜 로그인(유저 앱)
  |![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat\&logo=Vercel\&logoColor=white) | Vercel | 배포(Next.js 호스팅)


## 👥 팀원 소개
|                                         송민규                                          |                                         정다희                                          |
| :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------:|
|       <img width="160px" src="https://avatars.githubusercontent.com/u/107177636?v=4" />        |       <img width="160px" src="https://avatars.githubusercontent.com/u/55499429?v=4" />        | 
|                        [@SongMinQQ](https://github.com/SongMinQQ)                    |                       [@alotofhee](https://github.com/alotofhee)                        |
| 팀장 | 팀원 |



## 개발 서버 실행시 유의사항

만약 실행이 되지 않는다면 다음 경로에 node_modules가 있는지 확인

`/`

`/apps/admin`

`/apps/user` 

`/apps/storybook` 

`/packages/api` 

`/packages/ui`
