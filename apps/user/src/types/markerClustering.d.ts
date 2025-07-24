export interface MarkerClusteringOptions {
  map: naver.maps.Map | null;
  markers: naver.maps.Marker[];
  disableClickZoom?: boolean;
  minClusterSize?: number;
  maxZoom?: number;
  gridSize?: number;
  icons?: any[];
  indexGenerator?: number[] | ((count: number) => number);
  averageCenter?: boolean;
  stylingFunction?: (clusterMarker: any, count: number) => void;
}

export interface MarkerClustering {
  new (options: MarkerClusteringOptions): MarkerClustering;
  setMap(map: naver.maps.Map | null): void;
  getMap(): naver.maps.Map | null;
  setOptions(options: Partial<MarkerClusteringOptions>): void;
  getOptions(key?: string): any;
}

declare global {
  interface Window {
    MarkerClustering: MarkerClustering;
  }
}

export {};
