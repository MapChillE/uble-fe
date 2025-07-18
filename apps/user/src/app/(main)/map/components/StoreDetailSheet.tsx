import { StoreDetail, StoreSummary } from "@/types/store";
import { Sheet } from "react-modal-sheet";
import { DetailCard, SummaryCard } from "@/app/(main)/map/components/StoreCard";
export const mockdata = {
  statusCode: 0,
  message: "정상 처리 되었습니다.",
  data: {
    brandId: 86,
    storeId: 987,
    storeName: "파리바게뜨 PB선릉아이타워점",
    description: "신선한 빵과 만나는 정통 유럽풍 베이커리",
    address: "서울 강남구 테헤란로 326",
    phoneNumber: "02-565-3338",
    distance: 254.0943841989864,
    category: "카페",
    imageUrl: "https://uble-storage.s3.ap-northeast-2.amazonaws.com/logo/logo/PARIS_BAGUETTE.jpg",
    benefitList: [
      {
        benefitId: 86,
        type: "NORMAL",
        minRank: "PREMIUM" as "NONE" | "NORMAL" | "PREMIUM",
        content: "VVIP/VIP : 1천원당 100원 할인\n우수 : 1천원당 50원 할인",
        manual:
          "결제 시 직원에게 멤버십 카드 제시\n*꼭 확인하세요\n- 중복 할인 불가\n- 일부매장(올림픽공원점, 잠실점, 서초래미안점,이대서울병원점, 서울대병원점, 인천공항에어사이드, 인천공항탑승동, PB인천공항 가든, PB인천공항 플라워, 인천공항 랜드사이드,청주국제공항점)제외\n- 최종 결제금액의 0.1% 해피포인트로 추가 적립 혜택 중단",
        provisionCount: "일 1회",
      },
      {
        benefitId: 2,
        type: "VIP", //VIP콕
        minRank: "NONE" as "NONE" | "NORMAL" | "PREMIUM", //VIP등급부터 가능
        content: "싱글레귤러 1개 무료 교환",
        manual:
          "U+ 멤버십앱 메인 화면 우측 하단 ≡(전체) 클릭 >  VIP콕 > 배스킨라빈스 > 상단 '쿠폰 받기' 클릭 > U+멤버십 앱 메인 화면 우측 상단 '마이' 클릭 > 내 쿠폰함 > 쿠폰 내 이용방법 및 유의사항 참고\n*꼭 확인하세요\n- 배스킨라빈스 매장에서 구매 시 사용 가능하며, 플레이버 선택 가능합니다.\n- 1인 1매 사용 가능합니다.\n- 다른 행사나 쿠폰, 제휴할인은 중복 사용이 불가합니다.\n- 싱글레귤러는 포장 불가 합니다.\n- 캡쳐 이미지, 출력물 등으로 쿠폰 사용은 불가합니다.\n- 일부 매장에서는 사용이 제한될 수 있습니다. (사용 가능 매장, 배스킨라빈스 홈페이지 참조)\n- 쿠폰은 발급 받은 달 말일까지 사용 가능하며, 기간 연장은 불가합니다(예시: 1월 30일 발급 시 1월 31일까지 사용 가능)",
        provisionCount: "월 1회",
      },
    ],
    normalAvailable: true,
    vipAvailable: false,
    localAvailable: false,
  },
};
const StoreDetailSheet = ({
  isOpen,
  onClose,
  detail,
  snapIndex,
  setSnapIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  detail: StoreDetail | null;
  snapIndex: number;
  setSnapIndex: (idx: number) => void;
}) => (
  <Sheet
    isOpen={isOpen}
    onClose={onClose}
    snapPoints={[800, 380]}
    initialSnap={snapIndex}
    onSnap={setSnapIndex}
  >
    <Sheet.Container className="z-40 mx-auto max-w-md border-t border-gray-200 bg-white shadow-lg">
      <Sheet.Header className="sr-only">
        <div className="text-center font-bold">제휴처 정보</div>
      </Sheet.Header>
      <Sheet.Content className="p-0">
        <div className="flex flex-shrink-0 justify-center rounded-t-2xl bg-white py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300"></div>
        </div>
        <Sheet.Scroller>{detail && <DetailCard data={detail} />}</Sheet.Scroller>
      </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop className="pointer-events-auto z-50" />
  </Sheet>
);

export default StoreDetailSheet;
