import useUserStore from "@/store/useUserStore";
import Barcode from "react-barcode";
const UserBarcode = () => {
  const { user } = useUserStore();
  if (user?.barcode)
    return (
      <div className="flex justify-center" aria-label={`멤버십 바코드: ${user.barcode}`}>
        <Barcode
          value={user.barcode}
          font="pretendard"
          format="ITF"
          width={2}
          height={80}
          fontSize={18}
          background="#F9FAFB"
        />
      </div>
    );
  else return null;
};

export default UserBarcode;
