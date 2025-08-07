"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Search,
  Heart,
  User,
  Smartphone,
  Target,
  BarChart3,
  ArrowRight,
  Star,
  ArrowDown,
} from "lucide-react";
import KakaoLoginBtn from "../components/KakaoLoginBtn";
import { useRouter } from "next/navigation";

export default function UbleLanding() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100"
      >
        {/* Background decorations */}
        <motion.div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Image
              src="/profileImg.png"
              alt="UBLE Character"
              width={300}
              height={300}
              className="mx-auto mb-6"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-futura text-action-green mb-6 text-6xl font-bold tracking-tight md:text-7xl"
          >
            UBLE
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              한 눈에 파악하는 UBLE의 가치
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              내 위치 기반으로, 내가 받을 수 있는{" "}
              <span className="font-semibold text-emerald-600">LG U+ 멤버십 혜택</span>을 한눈에!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
          >
            <button
              className="bg-action-green transform rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl"
              onClick={() => router.replace("/")}
            >
              지금 시작하기 <ArrowRight className="ml-2 inline h-5 w-5" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="mt-20 flex flex-col items-center justify-center"
          >
            <div className="flex animate-bounce flex-col items-center justify-center text-gray-500">
              <ArrowDown className="mb-1 h-8 w-8" />
              <span className="text-sm">아래로 스크롤하세요</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Service Introduction */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              UBLE은 무엇인가요?
            </h2>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
              UBLE은 지도 기반으로 LG U+ 멤버십 제휴처를 실시간 추천해주는 서비스입니다.
              <br />
              현재 위치, 나이대, 시간대별 인기 사용처 등을 기준으로 가장 유용한 혜택을 보여드립니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <Image
                src="/intro/what_uble.gif"
                alt="UBLE Home Screen"
                width={300}
                height={600}
                className="rounded-3xl shadow-2xl"
                unoptimized
              />
              {/* <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400 to-blue-500 opacity-20 blur"></div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center text-4xl font-bold text-gray-800 md:text-5xl"
          >
            이런 기능을 제공해요
          </motion.h2>

          {/* Feature 1: Location-based recommendations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center gap-12 lg:flex-row"
          >
            <div className="lg:w-1/2">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-emerald-100 p-3">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">현재 위치 기반 추천</h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                GPS를 통해 내가 있는 주변의 제휴처를 지도로 보여주고,
                <br />
                마커 선택 시 혜택 상세 정보를 즉시 확인할 수 있어요.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                  실시간 위치
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  지도 기반
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  상세 정보
                </span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/map_func.gif"
                  alt="Map with location markers"
                  width={300}
                  height={600}
                  className="mx-auto rounded-3xl shadow-xl lg:ml-0"
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: Age-based and time-based recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center gap-12 lg:flex-row-reverse"
          >
            <div className="lg:w-1/2">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-3">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">
                  나이대별 추천 & 시간대 인기 혜택
                </h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                사용자 성향과 관심 카테고리에 맞춰 추천하고,
                <br />
                지금 많이 사용하는 제휴처를 실시간 인기 기준으로 선별해 보여드립니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                  개인화 추천
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                  실시간 인기
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  시간대별
                </span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/suggest.gif"
                  alt="Personalized recommendations"
                  width={300}
                  height={600}
                  className="mx-auto rounded-3xl shadow-xl"
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 3: Search & Autocomplete */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center gap-12 lg:flex-row"
          >
            <div className="lg:w-1/2">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-purple-100 p-3">
                  <Search className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">검색 & 자동완성 제안</h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                키워드 입력 시 추천 검색어를 아래에 탭처럼 보여주어
                <br />
                원하는 제휴처를 빠르게 찾을 수 있어요.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                  스마트 검색
                </span>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-800">
                  자동완성
                </span>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
                  빠른 접근
                </span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/search.gif"
                  alt="Search with autocomplete"
                  width={300}
                  height={600}
                  className="mx-auto rounded-3xl shadow-xl lg:ml-0"
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 4: Favorites */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center gap-12 lg:flex-row-reverse"
          >
            <div className="lg:w-1/2">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-red-100 p-3">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">즐겨찾기 기능</h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                마음에 드는 제휴처는 즐겨찾기에 저장하고,
                <br />
                즐겨찾기 탭에서 언제든지 조회 가능합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800">
                  북마크
                </span>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                  빠른 접근
                </span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  개인 관리
                </span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/favorites.png"
                  alt="Favorites page"
                  width={300}
                  height={600}
                  className="mx-auto rounded-3xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 5: My Page & Usage History */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col items-center gap-12 lg:flex-row"
          >
            <div className="lg:w-1/2">
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-yellow-100 p-3">
                  <BarChart3 className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">혜택 사용 내역 & 마이페이지</h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                마이페이지에서 멤버십 등급, 개인 정보(성별, 생년월일),
                <br />
                '혜택 사용 내역' 조회, 정보 수정, 피드백 전송 기능을 제공합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  사용 통계
                </span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  프로필 관리
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                  피드백
                </span>
              </div>
            </div>
            <div className="flex gap-4 lg:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/mypage.png"
                  alt="My page"
                  width={250}
                  height={500}
                  className="rounded-3xl shadow-xl"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/intro/usage_list.png"
                  alt="Usage history"
                  width={250}
                  height={500}
                  className="rounded-3xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why UBLE */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              왜 UBLE이어야 할까요?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "개인화된 추천",
                description: "위치·연령·우선순위 기반으로 내게 딱 맞는 혜택을 빠르게 확인",
                icon: <Target className="h-12 w-12" />,
                color: "emerald",
              },
              {
                title: "직관적인 지도 UI",
                description: "지도로 바로 찾고, 바로 클릭 → 간편 사용",
                icon: <MapPin className="h-12 w-12" />,
                color: "blue",
              },
              {
                title: "통합 관리",
                description: "즐겨찾기, 사용 내역, 바코드 입력 등 혜택 관리를 한곳에서",
                icon: <Smartphone className="h-12 w-12" />,
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div
                  className={`bg-${item.color}-100 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full p-4`}
                >
                  <div className={`text-${item.color}-600`}>{item.icon}</div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-800">{item.title}</h3>
                <p className="leading-relaxed text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "홈 화면",
                description: "오늘의 스페셜 & 추천 제휴처 카드",
                image: "/intro/home.png",
                icon: <Star className="h-6 w-6" />,
              },
              {
                title: "검색 탭",
                description: "검색창 + 추천 검색어 리스트",
                image: "/intro/search.png",
                icon: <Search className="h-6 w-6" />,
              },
              {
                title: "지도 탭",
                description: "내 위치 중심으로 주변 제휴처 지도",
                image: "/intro/map.png",
                icon: <MapPin className="h-6 w-6" />,
              },
              {
                title: "마이페이지",
                description: "사용자 프로필, 혜택 사용 내역",
                image: "/intro/mypage.png",
                icon: <User className="h-6 w-6" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 p-4">
                  <div className="text-emerald-600">{item.icon}</div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{item.description}</p>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={200}
                    height={400}
                    className="mx-auto rounded-2xl shadow-lg"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              UBLE을 통해 혜택을 사용하세요
            </h2>
            <p className="text-xl text-gray-600">바쁜 평일 저녁엔 이렇게 사용해요</p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 p-8 shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-hover-green flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    1
                  </div>
                  <p className="text-lg text-gray-700">
                    퇴근 후 UBLE 앱 열면, 근처 베이커리·카페·편의점 혜택이 지도에 표시됩니다.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-hover-green flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    2
                  </div>
                  <p className="text-lg text-gray-700">
                    사람 많은 시간대 인기 있는 매장 추천 → '파리바게뜨 1+1', 'GS25 적립 할인'
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-hover-green flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    3
                  </div>
                  <p className="text-lg text-gray-700">
                    혜택을 클릭하면 상세 설명 페이지로 이동 → 바코드 이용 또는 멤버십 카드 제시 안내
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-blue-600 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              지금 바로 UBLE로
              <br />내 주변 혜택을 확인하세요!
            </h2>
            <p className="mb-12 text-xl opacity-90">
              LG U+ 멤버십의 모든 혜택을 스마트하게 관리하고 활용해보세요
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // className="rounded-full bg-white px-12 py-4 text-xl font-bold text-emerald-600 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <KakaoLoginBtn />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="font-futura text-action-green mb-4 text-3xl font-bold">UBLE</div>
          <p className="text-gray-400">LG U+ 멤버십 혜택을 더 스마트하게</p>
        </div>
      </footer>
    </div>
  );
}
