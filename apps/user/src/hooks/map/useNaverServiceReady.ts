import { useEffect, useState } from "react";

const useNaverServiceReady = () => {
  const [serviceReady, setServiceReady] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.naver?.maps?.Service) {
        setServiceReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return serviceReady;
};

export default useNaverServiceReady;
