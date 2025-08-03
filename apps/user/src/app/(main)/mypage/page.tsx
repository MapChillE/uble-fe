import ProfileCard from "./components/ui/ProfileCard";
import ProfileInfo from "./components/ProfileInfo";
import ProfileStatistics from "./components/ProfileStatistics";
import BenefitListBtn from "./components/BenefitListBtn";
import FeedbackBtn from "./components/FeedbackBtn";
import LogoutBtn from "./components/LogoutBtn";
import WithdrawBtn from "./components/WithdrawBtn";
import ModalContainer from "./components/ModalContainer";

const page = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="min-h-screen space-y-6 px-4 py-6">
        {/* 프로필 섹션 - 독립적인 영역 */}
        <div className="rounded-lg border border-gray-50 bg-white shadow-sm">
          <ProfileCard className="p-6">
            <ProfileInfo />
          </ProfileCard>
        </div>

        {/* 통계 섹션 - 독립적인 영역 */}
        <div className="rounded-lg border border-gray-50 bg-white shadow-sm">
          <ProfileCard className="p-6">
            <ProfileStatistics />
          </ProfileCard>
        </div>

        {/* 메인 버튼 섹션 - 심플한 스타일 */}
        <div className="rounded-lg bg-white pb-80">
          <BenefitListBtn />
          <div className="border-b border-gray-100" />
          <FeedbackBtn />
        </div>

        {/* 하단 계정 관리 섹션 */}
        <div className="pt-4">
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <LogoutBtn />
            <div className="w-px bg-gray-300" />
            <WithdrawBtn />
          </div>
        </div>

        <ModalContainer />
      </div>
    </div>
  );
};

export default page;
