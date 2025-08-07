import FeedbackContainer from "./components/FeedbackContainer";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">사용자 피드백</h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          사용자들의 소중한 의견을 확인하고 관리하세요
        </p>
      </div>
      <FeedbackContainer />
    </div>
  );
};

export default page;
