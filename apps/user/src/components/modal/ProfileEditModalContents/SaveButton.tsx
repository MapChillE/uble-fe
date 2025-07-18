import { Button } from "@workspace/ui/components/button";
import { UserInfo } from "@/types/profile";
import useProfileEditModalStore from "@/store/useProfileEditModalStore";

interface SaveButtonProps {
  formData: UserInfo;
  user: UserInfo;
}

const SaveButton = ({ formData, user }: SaveButtonProps) => {
  const { close } = useProfileEditModalStore();
  const isChanged =
    formData.rank !== user.rank ||
    formData.gender !== user.gender ||
    formData.birthDate !== user.birthDate ||
    formData.barcodeNumber !== (user.barcodeNumber || '') ||
    formData.categoryIds?.length !== user.categoryIds?.length ||
    !formData.categoryIds.every((id) => user.categoryIds.includes(id));

  const canSave =
    !!formData.rank &&
    !!formData.gender &&
    !!formData.birthDate &&
    formData.categoryIds?.length > 0 &&
    isChanged;

  const handleEditUserInfo = async () => {
    // 여기에 유저 정보 수정 로직 구현 후 모달 닫음
    console.log(formData);
    close();
  }

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