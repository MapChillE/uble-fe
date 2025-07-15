import axios from "axios";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

/**사용자의 동시 요청 충돌 방지용 큐 */
function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

/** refreshToken까지 만료되었을 경우 토큰 모두 삭제 */
function handleAuthError() {
  localStorage.removeItem("accessToken");
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/** 토큰 재발급 함수 */
async function reissueAndRetry(originalRequest) {
  const response = await axios.post(`${BASE_URL}api/auth/reissue"`, {}, { withCredentials: true });
  const newAccessToken = response.headers["authorization"];
  if (newAccessToken) {
    const token = newAccessToken.startsWith("Bearer ") ? newAccessToken.slice(7) : newAccessToken;
    window.localStorage.setItem("accessToken", token);
    api.defaults.headers["Authorization"] = newAccessToken;
    processQueue(null, newAccessToken);
    originalRequest.headers["Authorization"] = newAccessToken;
    return api(originalRequest);
  }
  throw new Error("토큰 재발급 실패");
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }
      isRefreshing = true;
      try {
        return await reissueAndRetry(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleAuthError();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
