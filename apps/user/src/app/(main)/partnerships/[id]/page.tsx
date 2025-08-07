"use client"
import { useParams } from "next/navigation";
import PartnershipContainer from "./components/PartnershipContainer";

const page = () => {
  const params = useParams();
  const id = params.id as string;
  return (
    <div>
      {id && <PartnershipContainer id={id} />}
    </div>
  );
};

export default page;