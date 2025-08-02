import { StatisticsFilter } from "@/types/statistics";
import {
  ClickRankApiResponse,
  InterestRankApiResponse,
  UsageRankApiResponse,
  LocalRankApiResponse,
  RankParams,
} from "@/types/rank";
import api from "@api/http-commons";

// 파라미터 필터링 함수
const filterNonNullParams = (params: StatisticsFilter): RankParams => {
  const filteredParams: RankParams = {
    rankTarget: params.rankTarget,
  };

  if (params.gender !== null) {
    filteredParams.gender = params.gender;
  }
  if (params.ageRange !== null) {
    filteredParams.ageRange = params.ageRange;
  }
  if (params.rank !== null) {
    filteredParams.rank = params.rank;
  }
  if (params.benefitType !== null) {
    filteredParams.benefitType = params.benefitType;
  }

  return filteredParams;
};

export const fetchStatistics = async ({
  params,
  reqUrl,
}: {
  params: StatisticsFilter;
  reqUrl: string;
}) => {
  // click과 usage만 rankTarget이 필수, 나머지는 제외
  const isRankTargetRequired = reqUrl === "click" || reqUrl === "usage";

  let requestParams: Partial<RankParams> = {};

  if (isRankTargetRequired) {
    // rankTarget이 필수인 경우
    requestParams = filterNonNullParams(params);
  } else {
    const { rankTarget, ...otherParams } = filterNonNullParams(params);
    requestParams = otherParams;
  }

  const { data } = await api.get(`/api/admin/statistics/rank/${reqUrl}`, {
    params: requestParams,
  });

  // reqUrl에 따른 응답 타입 처리
  switch (reqUrl) {
    case "click":
      return data as ClickRankApiResponse;
    case "interest-change":
      return data as InterestRankApiResponse;
    case "keywords/daily-top":
    case "keywords/empty-top":
      return data as LocalRankApiResponse;
    case "local":
      return data as LocalRankApiResponse;
    case "usage":
      return data as UsageRankApiResponse;
    default:
      return data;
  }
};
