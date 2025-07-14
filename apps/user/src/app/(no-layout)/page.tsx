import { Zap } from "lucide-react";
import KakaoLoginBtn from "./components/KakaoLoginBtn";

export default function Page() {
  return (
    <div>
      <div className="px-4 py-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-spot-green rounded-2xl flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">UBLE</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <img
          src="uble_character.svg"
          alt="UBLE 캐릭터"
          className="w-110 h-110 object-contain drop-shadow-md"
        />
      </div>
      <KakaoLoginBtn />
    </div>
  );
}
