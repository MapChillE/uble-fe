'use client'
import { Fragment, useState } from 'react';
import BenefitStatistics from './BenefitStatistics';
import { benefitHistory } from './testData';
import BenefitListItem from './BenefitListItem';
import PeriodFilter from './PeriodFilter';

const BenefitList = () => {
  const [period, setPeriod] = useState<string>("all");
  return (
    <Fragment>
      <PeriodFilter period={period} setPeriod={setPeriod} />
      <BenefitStatistics listSize={benefitHistory.length} />
      <div className="px-4 py-4 space-y-3">
        {benefitHistory.map((item) => (
          <BenefitListItem data={item} key={item.bookmarkId} />
        ))}
      </div>
    </Fragment>
  );
};

export default BenefitList;