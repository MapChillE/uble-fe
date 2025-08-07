# Uble - 지도 기반 사용자 맞춤 제휴처 추천 서비스

<div align="center">

<img src="apps/user/public/profileImg.png" width="280" alt="Uble Character">

</div>

<div align="center">

[**UBLE 바로가기**](https://www.u-ble.com)

[**UBLE Admin 바로가기**](https://admin.u-ble.com)

</div>

## 🗺 프로젝트 소개

**UBLE**은 LG유플러스 멤버십 회원의 혜택 이용률과 서비스 만족도를 높이기 위해 개발된 **위치 기반 제휴처 안내 서비스**입니다.  
**네이버 지도 API를 활용**하여 사용자의 현재 위치 또는 지정한 위치를 중심으로 **주변 제휴 매장**을 쉽고 직관적으로 탐색할 수 있도록 지원합니다.

또한, 사용자 정보(성별, 나이, 관심 카테고리 등)와 이용 이력, 시간대 데이터를 분석하여 **맞춤형 제휴처 추천** 기능을 제공함으로써  
사용자가 가장 필요할 때, 가장 적합한 혜택을 누릴 수 있도록 돕습니다.

즐겨찾기로 나만의 제휴처를 저장하고, 마이페이지에서 바코드 등록과 정보 수정도 간편하게 할 수 있어요.

언제, 어디서 어떤 혜택을 얼마나 썼는지도 확인할 수 있어서, 내 멤버십 사용이 한눈에 정리됩니다.

**UBLE은 LGU+ 멤버십 혜택을 찾는 수고를 덜고, 더 똑똑하게 사용하는 경험을 제공합니다.**

## 🚩 프로젝트 개요

| 항목           | 내용                                 |
| -------------- | ------------------------------------ |
| **프로젝트명** | Uble                                 |
| **팀명**       | 맵칠이(MapChillE)                    |
| **주제**       | LG U+ 멤버십 제휴처 안내 지도 서비스 |
| **개발 기간**  | 2025.06.30 - 2025.08.08              |

## 👥 Teams

|                                      송민규                                       |                                      정다희                                      |
| :-------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/107177636?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/55499429?v=4" /> |
|                    [@SongMinQQ](https://github.com/SongMinQQ)                     |                    [@alotofhee](https://github.com/alotofhee)                    |
|                                       팀장                                        |                                       팀원                                       |

## ⚔️ 기술 스택

### **Monorepo & 패키지 관리**

|                                                                                                       | 사용 기술 | 역할                               |
| :---------------------------------------------------------------------------------------------------- | :-------- | :--------------------------------- |
| ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat&logo=Turborepo&logoColor=white) | Turborepo | 모노레포 관리 및 빌드/캐시 최적화  |
| ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white)                | pnpm      | 패키지 매니저 및 워크스페이스 관리 |

### **프론트엔드**

|                                                                                                                 | 사용 기술     | 역할                                    |
| :-------------------------------------------------------------------------------------------------------------- | :------------ | :-------------------------------------- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black)                       | React         | UI 라이브러리                           |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white)                 | Next.js       | React 기반 프레임워크 (App Router 구조) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white)        | TypeScript    | 정적 타입 언어                          |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white)     | Tailwind CSS  | 유틸리티 퍼스트 CSS 프레임워크          |
| ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat&logo=lucide&logoColor=white)                    | Lucide        | 아이콘 라이브러리                       |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)      | Framer Motion | UI 애니메이션                           |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=flat&logo=radix-ui&logoColor=white)              | Radix UI      | 접근성 높은 UI 컴포넌트                 |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcn&logoColor=white)              | shadcn/ui     | Tailwind 기반 UI 컴포넌트 컬렉션        |
| ![React Day Picker](https://img.shields.io/badge/React_Day_Picker-1E90FF?style=flat&logo=react&logoColor=white) | Day Picker    | 날짜 선택 UI                            |
| ![React Barcode](https://img.shields.io/badge/React_Barcode-000000?style=flat&logo=react&logoColor=white)       | React Barcode | 바코드 생성 및 표시                     |

### **상태 관리 & 데이터**

|                                                                                                            | 사용 기술             | 역할                          |
| :--------------------------------------------------------------------------------------------------------- | :-------------------- | :---------------------------- |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=reactquery&logoColor=white) | @tanstack/react-query | 서버 상태 관리 및 데이터 패칭 |
| ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=react&logoColor=white)              | Zustand               | 클라이언트 상태 관리          |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                  | Axios                 | HTTP 클라이언트               |

### **데이터 시각화**

|                                                                                                               | 사용 기술       | 역할                     |
| :------------------------------------------------------------------------------------------------------------ | :-------------- | :----------------------- |
| ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)            | Chart.js        | 데이터 시각화 라이브러리 |
| ![React Chartjs 2](https://img.shields.io/badge/React_Chartjs_2-FF6384?style=flat&logo=react&logoColor=white) | react-chartjs-2 | React용 Chart.js 래퍼    |

### **코드 품질 & 협업**

|                                                                                                                          | 사용 기술            | 역할                       |
| :----------------------------------------------------------------------------------------------------------------------- | :------------------- | :------------------------- |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)                             | ESLint               | 코드 스타일 및 린팅        |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)                       | Prettier             | 코드 포매터                |
| ![Custom ESLint Config](https://img.shields.io/badge/Custom_ESLint_Config-000000?style=flat&logo=eslint&logoColor=white) | Custom ESLint Config | 모노레포 내 공통 린트 설정 |

### **기타**

|                                                                                                                     | 사용 기술         | 역할                       |
| :------------------------------------------------------------------------------------------------------------------ | :---------------- | :------------------------- |
| ![mkcert](https://img.shields.io/badge/mkcert-000000?style=flat&logo=letsencrypt&logoColor=white)                   | mkcert            | 로컬 HTTPS 인증서 생성     |
| ![Naver Map](https://img.shields.io/badge/Naver_Map_API-03C75A?style=flat&logo=naver&logoColor=white)               | Naver Map API     | 지도 서비스 (유저 앱)      |
| ![Kakao Login](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat&logo=kakaotalk&logoColor=black)           | Kakao Login       | 소셜 로그인 (유저 앱)      |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)                        | Vercel            | 배포 및 Next.js 앱 호스팅  |
| ![Sonner](https://img.shields.io/badge/Sonner-FFDD4A?style=flat&logo=react&logoColor=black)                         | Sonner            | 알림 및 토스트 메시지      |
| ![Date fns](https://img.shields.io/badge/Date_fns-F70000?style=flat&logo=datefns&logoColor=white)                   | date-fns          | 날짜 유틸리티 라이브러리   |
| ![vaul](https://img.shields.io/badge/Vaul-000000?style=flat&logo=react&logoColor=white)                             | vaul              | 모달 및 드로어 UI 컴포넌트 |
| ![use-debounce](https://img.shields.io/badge/use--debounce-000000?style=flat&logo=react&logoColor=white)            | use-debounce      | 디바운싱 유틸리티 Hook     |
| ![react-modal-sheet](https://img.shields.io/badge/react--modal--sheet-000000?style=flat&logo=react&logoColor=white) | react-modal-sheet | 하단 시트 UI 컴포넌트      |
| ![motion](https://img.shields.io/badge/motion-0055FF?style=flat&logo=framer&logoColor=white)                        | motion            | 경량 애니메이션 라이브러리 |

## 📁 프로젝트 구조

```
uble-fe/
├── apps/                    # 실제 서비스되는 앱들
│   ├── admin/              # 관리자 프론트엔드 앱
│   ├── storybook/          # UI 컴포넌트 개발/테스트용 스토리북
│   └── user/               # 사용자 프론트엔드 앱
│       ├── public/         # 정적 파일 (이미지, 아이콘 등)
│       └── src/
│           ├── app/        # Next.js App Router
│           │   ├── (main)/     # 메인 레이아웃 (홈, 지도, 마이페이지 등)
│           │   └── (no-layout)/ # 별도 레이아웃 (로그인, 회원가입 등)
│           ├── components/ # 공통 컴포넌트
│           ├── hooks/      # 커스텀 React 훅
│           ├── service/    # API 서비스 함수
│           ├── store/      # 전역 상태 관리 (Zustand)
│           ├── types/      # TypeScript 타입 정의
│           └── utils/      # 유틸리티 함수
├── packages/               # 공통 패키지들
│   ├── api/               # API 연동 및 핸들러
│   ├── eslint-config/     # ESLint 공통 설정
│   ├── tailwind-config/   # Tailwind CSS 공통 설정
│   ├── typescript-config/ # TypeScript 공통 설정
│   └── ui/                # 공통 UI 컴포넌트 라이브러리
└── README.md              # 프로젝트 설명 파일
```

## 🧭 Service Flow

![Service Flow](diagrams/Service_Flow.png)

## 🤴 Admin Flow

![Admin Flow](diagrams/Admin_Flow.png)

## 📰 Information Architecture

![Admin Flow](diagrams/information_architecture.png)

## 💻 Screens

| 기능명                                                     | 설명                                                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **사용자 정보 및 관심사 기반 제휴처 추천** | <img src="https://github.com/user-attachments/assets/76b19543-f01b-48cb-9c77-9a878d8a07e9" width="250"/> <br> 사용자의 나이, 성별, 관심 카테고리 등 프로필 정보를 분석하여 맞춤형 LGU+ 멤버십 제휴처를 추천합니다.|
| **LGU+ 멤버십 제휴처 혜택 정보**                           | <img src="https://github.com/user-attachments/assets/b3974a9b-e678-4c2b-a7ba-8a0338bff2b8" width="250" /> <br> 각 제휴처의 상세한 혜택 정보를 조회하고, 할인 및 이벤트 등의 최신 정보를 제공합니다.                                                  
| **실시간 인기 멤버십 제휴처 정보**                         | <img width="250" alt="image" src="https://github.com/user-attachments/assets/c08a0d69-2f35-4467-b507-dddccaa658d1" /> <br> 현재 시간 기준으로 사용자들이 가장 많이 방문한 인기 제휴처 정보를 실시간으로 제공합니다.                                              
| **자동 완성 기능을 탑재한 검색 기능**                      | <img width="250" src="https://github.com/user-attachments/assets/2ce870f6-40bf-45b5-9f1a-146292bebb33" /> <br> 제휴처 및 키워드 검색 시, 사용자 입력에 따라 자동 완성 및 추천 검색어를 실시간으로 제공합니다.                                        
| **지도 기반 제휴처 탐색**                                  | <img src="https://github.com/user-attachments/assets/9abc8d76-dcf9-4542-aa60-8b03aed299b9" width="250" /> <br> 사용자의 현재 위치 주변에 존재하는 LGU+ 제휴처를 지도상에서 확인할 수 있으며, 매장 클릭 시 상세 정보가 제공됩니다.                    
| **사용자 지정 위치 저장**                                  |  <img src="https://github.com/user-attachments/assets/0e38e285-9195-4ac9-815f-aff245c5cc4b" width="250" /> <br> 사용자가 자주 방문하거나 관심 있는 위치를 지정하여 빠르게 탐색할 수 있도록 저장할 수 있습니다.                                        
| **자동 완성 기능을 탑재한 제휴처 매장 검색 기능**          | <img src="https://github.com/user-attachments/assets/52879155-6c4a-416c-8156-6a2dee63c1f1" width="250" /> <br> 제휴처 이름이나 키워드를 입력할 때, 관련 매장을 자동 완성 형태로 실시간으로 제안하여 빠르게 탐색할 수 있습니다.                       
| **제휴처 즐겨찾기**                                        | <img src="https://github.com/user-attachments/assets/9d909a53-6c90-441e-8dc3-3321a3d143fe" width="250" /> <br> 관심 있는 제휴처를 즐겨찾기로 저장하여 언제든지 쉽게 다시 확인할 수 있도록 지원합니다.                                                
| **사용자 정보 및 관심 카테고리 등 설정 지원(마이페이지)**  | <img src="https://github.com/user-attachments/assets/6d8bd429-9338-4e60-afbf-dc447cba1a7a" width="250" /> <br> 사용자 프로필 정보, 관심 카테고리, 멤버십 등급, 바코드 번호 등 다양한 설정을 마이페이지에서 관리할 수 있도록 지원합니다.             
| **바코드 기반 멤버십 혜택 사용**                           | <img src="https://github.com/user-attachments/assets/35685677-aa6f-4b41-9a97-42cfe27036aa" width="250" /> <br> 사용자가 등록한 바코드 번호를 기반으로 실제 사용할 수 있는 멤버십 바코드를 자동 생성하여 제휴처에서 혜택을 받을 수 있도록 지원합니다.
| **유저 개인 및 전체 사용자 평균 기준 혜택 사용 통계 조회** | <img src="https://github.com/user-attachments/assets/43d92131-a5c5-480c-b055-5e438d0016fd" width="250" /> <br> 개인의 혜택 사용량과 전체 사용자 평균 사용량을 비교하여 시각적으로 제공합니다.                                                       
| **혜택 사용 내역 조회**                                    | <img src="https://github.com/user-attachments/assets/08eaa0d0-474e-4597-adb7-b42bf37376be" width="250" /> <br> 사용자가 실제 사용한 제휴처 혜택의 사용 내역과 날짜, 사용처, 할인율 등의 상세 정보를 조회할 수 있도록 제공합니다.       

## 📄 산출물  

[기획안](https://docs.google.com/document/d/1Jc75pIE8n0mWEddReLd9L6h3VKGicifBojlAmoiGeNE/edit?tab=t.0)
  
[QA](https://www.notion.so/QA-23a71951642680fea8d9e334f6945acc?pvs=21)
 
[TroubleShooting](https://www.notion.so/troubleshooting-23b719516426804f9a2ce97e0b1e2432?pvs=21)
