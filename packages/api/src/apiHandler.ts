import type { AxiosError } from "axios";

export function errorTracker(error: unknown) {
  let msg = "오류가 발생했습니다.";
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const responseMessage = axiosError.response;

    if (typeof responseMessage?.data === "string") {
      msg = responseMessage?.data;
    } else if (
      typeof responseMessage?.data === "object" &&
      responseMessage?.data !== null &&
      Object.prototype.hasOwnProperty.call(responseMessage.data, "message")
    ) {
      msg = (responseMessage.data as { message: string }).message || msg;
    }
  } else if (error instanceof Error) {
    msg = error.message;
  }

  return msg;
}

export const apiHandler = async <T>(fn: () => Promise<T>) => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error: unknown) {
    let msg = "오류가 발생했습니다.";

    msg = errorTracker(error);

    return { data: null, error: msg };
  }
};

function isAxiosError(error: unknown): error is AxiosError {
  return !!(error as AxiosError).isAxiosError;
}
