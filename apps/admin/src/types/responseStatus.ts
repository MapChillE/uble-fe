export interface ResponseStatus {
  /** HTTP 상태 코드가 아닌, API 비즈니스 성공 여부 코드 (0: 성공) */
  statusCode: number;
  /** 서버에서 전달하는 메시지 */
  message: string;
}
