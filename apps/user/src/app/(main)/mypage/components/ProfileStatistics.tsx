import { UserStatistics } from '@/types/profile';
import { BarChart3 } from 'lucide-react';
import { Fragment } from 'react';

const ProfileStatistics = () => {
  const userStats: UserStatistics = {
    category: "카페",
    total: 30
  }
  return (
    <Fragment>
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">나의 통계</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">많이 이용한 업종</span>
          <span className="text-sm font-semibold text-gray-900">{userStats.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">받은 혜택 개수</span>
          <span className="text-sm font-semibold text-gray-900">{userStats.total}개</span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileStatistics;