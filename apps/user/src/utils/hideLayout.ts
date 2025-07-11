/**
 * Footer와 Header를 숨겨야 하는 경로를 판별합니다.
 * @param pathname 현재 페이지의 경로명 (string 값)
 * @returns {boolean} 숨겨야 하는 경로인지를 boolean값으로 반환합니다.
 * @example
 * hideLayout("/") // true
 */
export const HIDE_LAYOUT_PATHS = ["/", "/signup"];

export function hideLayout(pathname: string): boolean {
  return HIDE_LAYOUT_PATHS.includes(pathname);
}
