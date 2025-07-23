import useUserStore from "@/store/useUserStore";
import Barcode from "react-barcode";
const UserBarcode = () => {
  const { user } = useUserStore();
  if (user.barcode)
    return (
      <div className="flex justify-center">
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
};

export default UserBarcode;
