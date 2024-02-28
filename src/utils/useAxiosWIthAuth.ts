import axios, { InternalAxiosRequestConfig } from "axios";

const userAxiosWithAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
    const token = getCookie("token");

    if (!token) {
      config.headers.accessToken = null;
    } else {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default userAxiosWithAuth;
