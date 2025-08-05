"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import KakaoLoginBtn from "./components/KakaoLoginBtn";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const taglineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function Page() {
  const router = useRouter();
  return (
    <div className="from-action-green/10 to-action-green/10 relative flex h-[100dvh] flex-col items-center justify-between overflow-hidden overscroll-none bg-gradient-to-b via-slate-50">
      <motion.span
        className="bg-action-green/20 pointer-events-none absolute -left-40 -top-40 block h-[25rem] w-[25rem] rounded-full blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.span
        className="bg-action-green/15 pointer-events-none absolute -right-56 top-1/3 block h-[32rem] w-[32rem] rounded-full blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1.1, rotate: -30 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      <section className="flex flex-[2] flex-col items-center justify-center gap-2 px-6 text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="z-10"
        >
          <Image
            src="/assets/uble_character.png"
            alt="Uble 캐릭터"
            width={230}
            height={230}
            quality={100}
            priority
          />
        </motion.div>

        <motion.h1
          className="font-futura text-action-green text-[3rem] font-extrabold tracking-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 12 }}
        >
          UBLE
        </motion.h1>

        <motion.div
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md text-gray-600"
        >
          <motion.p variants={lineVariants} className="md:text-md text-base">
            U+ 멤버십 혜택, 지도로 한눈에!
          </motion.p>
          <motion.p variants={lineVariants} className="md:text-md text-base">
            지금 내 주변 제휴처를 찾아보세요.
          </motion.p>
        </motion.div>
      </section>
      <section className="flex-[1]">
        <motion.div
          onClick={() => router.push("/intro")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-2 mt-6 flex cursor-pointer flex-col items-center text-center"
        >
          <div className="bg-action-green/10 hover:bg-action-green/20 flex items-center space-x-2 rounded-full px-4 py-2 transition">
            <span className="text-action-green font-semibold">
              처음이세요? UBLE 서비스 소개부터 볼게요
            </span>
            <ArrowRight className="text-action-green h-5 w-5" />
          </div>
        </motion.div>
        <motion.div
          className="flex-shrink-0 px-6"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="z-10 md:pb-8">
            <KakaoLoginBtn />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
