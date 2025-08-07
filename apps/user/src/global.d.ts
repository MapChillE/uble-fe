declare global {
  interface Window {
    naver: typeof naver;
    MarkerClustering: any; // 마커 클러스터링 스크립트 타입
  }
}

export {};
