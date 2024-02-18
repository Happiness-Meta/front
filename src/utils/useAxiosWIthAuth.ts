import axios, { InternalAxiosRequestConfig } from "axios";

const userAxiosWithAuth = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-type": "application/json" },
});

function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

userAxiosWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const [cookies] = useCookies(["id"]);
    const token = getCookie("token");

    if (!token) {
      config.headers.accessToken = null;
    } else {
      config.headers.authorization = `Bearer ${token}`;
    }

    // Do something before request is sent
    console.log("request start", config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log("get response", response);
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     if (status === 401) {
//       if (error.response.data.message === "expired") {
//         const originalRequest = config;
//         const refreshToken = await localStorage.getItem("refreshToken");
//         // token refresh 요청
//         const { data } = await axios.post(
//           "http://43.203.92.111/", // token refresh api
//           {},
//           { headers: { authorization: `Bearer ${refreshToken}` } }
//         );
//         // 새로운 토큰 저장
//         // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           data;
//         await localStorage.multiSet([
//           ["accessToken", newAccessToken],
//           ["refreshToken", newRefreshToken],
//         ]);
//         originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//         // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
//         return axios(originalRequest);
//       }
//     }
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log("response error", error);
//     return Promise.reject(error);
//   }
// );

export default userAxiosWithAuth;
