import { Button } from "@workspace/ui/components/button";
import { UserInfo } from "@/types/profile";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";
import { apiHandler } from "@api/apiHandler";
import { setUserInfo } from "@/service/user";
import useUserStore from "@/store/useUserStore";

interface SaveButtonProps {
  formData: UserInfo;
  user: UserInfo;
}

const SaveButton = ({ formData, user }: SaveButtonProps) => {
  const { close } = useProfileEditModalStore();
  const { setUser } = useUserStore();
  const isChanged =
    formData.rank !== user.rank ||
    formData.gender !== user.gender ||
    formData.birthDate !== user.birthDate ||
    formData.barcodeNumber !== (user.barcodeNumber || "") ||
    formData.categoryIds?.length !== user.categoryIds?.length ||
    !formData.categoryIds.every((id) => user.categoryIds.includes(id));

  const canSave =
    !!formData.rank &&
    !!formData.gender &&
    !!formData.birthDate &&
    formData.categoryIds?.length > 0 &&
    (!formData.barcodeNumber ||
      formData.barcodeNumber.length === 0 ||
      formData.barcodeNumber.length > 15) &&
    isChanged;

  const handleEditUserInfo = async () => {
    // 여기에 유저 정보 수정 로직 구현 후 모달 닫음
    const { data } = await apiHandler(() => setUserInfo(formData));
    if (data?.statusCode === 0) {
      setUser(formData);
      alert("정보가 수정되었습니다.");
      close();
    } else alert("사용자 정보 수정에 실패했습니다.");
  };

  return (
    <Button
      onClick={handleEditUserInfo}
      disabled={!canSave}
      className="flex-1 bg-[#41d596] hover:bg-[#41d596]/90 disabled:bg-gray-300"
    >
      저장
    </Button>
  );
};

export default SaveButton;
