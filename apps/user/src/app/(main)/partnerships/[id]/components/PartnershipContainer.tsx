import { BrandContent, BrandDetailData } from "@/types/brand";
import PartnershipHeader from "./PartnershipHeader";
import FavoriteBtn from "@/components/FavoriteBtn";
import PartnershipBenefitList from "./PartnershipBenefitList";

const PartnershipContainer = () => {
  const data: BrandDetailData = {
    "brandId": 60,
    "name": "배스킨라빈스",
    "csrNumber": "배스킨라빈스 080-555-3131(유료)",
    "description": "행복을 전하는 프리미엄 아이스크림, 배스킨라빈스",
    "imgUrl": "https://uble-storage.s3.ap-northeast-2.amazonaws.com/logo/logo/BASKIN_ROBBINS.png",
    "season": "ETC",
    "categoryName": "카페",
    "isBookmarked": true,
    "bookmarkId": 10,
    "isVIPcock": true,
    "benefits": [
      {
        "benefitId": 89,
        "type": "NORMAL",
        "minRank": "NORMAL",
        "content": "패밀리 사이즈(5가지 맛) 4천원 할인",
        "manual": "- U+ 멤버십앱 메인 화면 우측 상단 검색(돋보기 모양) 클릭 > 배스킨라빈스 검색 > 제휴사 클릭 후  '다운로드' 클릭 > U+멤버십 앱 메인 화면 우측 상단 '마이' 클릭 > 내 쿠폰함 > 쿠폰 내 이용방법 및 유의사항 참고\n*꼭 확인하세요\n- 배스킨라빈스 매장에서 구매 시 사용 가능하며, 플레이버 선택 가능합니다.\n- 패밀리사이즈 포장 가능합니다.\n- 1인 1매 사용 가능합니다.\n- 다른 행사나 쿠폰, 제휴할인은 중복 사용이 불가합니다.\n- 모바일 교환권 사용 가능하며, 타 사에서 구매하신 할인된 모바일 교환권으로는 구매가 불가 합니다.\n- 캡쳐 이미지, 출력물 등으로 쿠폰 사용은 불가합니다.\n- 일부 매장에서는 사용이 제한될 수 있습니다. (사용 가능 매장, 배스킨라빈스 홈페이지 참조)\n- 결제 금액의 0.1% 해피포인트 적립 가능합니다.\n- 쿠폰은 발급 받은 달 말일까지 사용 가능하며, 기간 연장은 불가합니다(예시: 1월 30일 발급 시 1월 31일까지 사용 가능)",
        "provisionCount": "월 1회"
      },
      {
        "benefitId": 60,
        "type": "VIP",
        "minRank": "NONE",
        "content": "싱글레귤러 1개 무료 교환",
        "manual": "U+ 멤버십앱 메인 화면 우측 하단 ≡(전체) 클릭 >  VIP콕 > 배스킨라빈스 > 상단 '쿠폰 받기' 클릭 > U+멤버십 앱 메인 화면 우측 상단 '마이' 클릭 > 내 쿠폰함 > 쿠폰 내 이용방법 및 유의사항 참고\n*꼭 확인하세요\n- 배스킨라빈스 매장에서 구매 시 사용 가능하며, 플레이버 선택 가능합니다.\n- 1인 1매 사용 가능합니다.\n- 다른 행사나 쿠폰, 제휴할인은 중복 사용이 불가합니다.\n- 싱글레귤러는 포장 불가 합니다.\n- 캡쳐 이미지, 출력물 등으로 쿠폰 사용은 불가합니다.\n- 일부 매장에서는 사용이 제한될 수 있습니다. (사용 가능 매장, 배스킨라빈스 홈페이지 참조)\n- 쿠폰은 발급 받은 달 말일까지 사용 가능하며, 기간 연장은 불가합니다(예시: 1월 30일 발급 시 1월 31일까지 사용 가능)",
        "provisionCount": "월 1회"
      }
    ]
  };

  return (
    <div className="space-y-4">
      <div className="p-4 space-y-4">
        <PartnershipHeader {...data} />
        <PartnershipBenefitList {...data} />
      </div>
    </div>
  );
};

export default PartnershipContainer;