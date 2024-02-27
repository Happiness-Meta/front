import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CodePage from "./pages/CodePage/CodePage";
import Dashboard from "./pages/RepoPage/Page/dashboard/Dashboard";
import MyPage from "./pages/MyPage/MyPage";
import SignInUpPage from "./pages/SignInUpPage/SignInUpPage";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale("en"); // 언어 등록

Modal.setAppElement("#root");
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signInUpPage" element={<SignInUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/codePage" element={<CodePage />} />
            <Route path="/codePage/:repoId" element={<CodePage />} />
          </Routes>
        </Router>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
