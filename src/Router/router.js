import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout1 } from "../page/user/layout/Layout1";
import { HomeUser } from "../page/user/page/home/Home";
import { Login } from "../page/user/page/login/Login";
import { Layout1Admin } from "../page/admin/layout/Layout1Admin";
import { Register } from "../page/user/page/register/Register";
import { Profile } from "../page/user/page/profile/Profile";
import { Dashboard } from "../page/admin/page/Dashboard/Dashboard";
import { Login as LoginAdmin } from "../page/admin/page/login/Login";
import VerifyEmail from "page/user/page/verifyEmail/VerifyEmail";
// import { Contact } from '../page/user/page/contact/Contact';
import { Button, Result } from "antd";
import DonHangManagement from "page/admin/page/donHangManagement/DonHangManagement";
import TaiKhoanManagement from "page/admin/page/AccountManagement/TaiKhoanManagement";
import { SanPhamManagement } from "page/admin/page/SanPhamManagement/SanPhamManagement";

export const MainRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login") {
      if (localStorage.getItem("jwt")) {
        window.location.replace("/");
      }
    }
  }, [pathname]);

  return (
    <div>
      <Routes>
        {/* Trang mặc định */}
        {/* <Route path="/" element={<Welcome/>}/> */}
        {/* <Route path="/" element={<Layout1 />}>
          <Route index element={<HomeUser />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="infoBook/:id" element={<InfoBook />} />
          <Route path="allBooks" element={<AllBooks />} />
          <Route path="aboutUs" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="introduce" element={<Introduce />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart/:id" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="book" element={<BookCategory />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="baiViet" element={<BaiViet />} />
        </Route> */}
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.replace("/")}
                >
                  Back Home
                </Button>
              }
            />
          }
          HomeUser
        />
        <Route path="/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/admin" element={<Layout1Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accountManagement" element={<TaiKhoanManagement />} />
          <Route path="sanPhamManagement" element={<SanPhamManagement />} />
          <Route path="donHangManagement" element={<DonHangManagement />} />
          <Route path="login" element={<LoginAdmin />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </div>
  );
};
