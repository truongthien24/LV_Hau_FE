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
import { BookManagement } from "../page/admin/page/RoomManagement/BookManagement";
import { Introduce } from "../page/user/page/introduce/Introduce";
import { Contact } from "page/user/page/contact/Contact";
import VerifyEmail from "page/user/page/verifyEmail/VerifyEmail";
import TheLoaiManagement from "page/admin/page/System/theLoaiManagement/TheLoaiManagement";
import TacGiaManagement from "page/admin/page/System/tacGiaManagement/TacGiaManagement";
import NhaCungCapManagement from "page/admin/page/System/nhaCungCapManagement/NhaCungCapManagement";
import NhaXuatBanManagement from "page/admin/page/System/nhaXuatBanManagement/NhaXuatBanManagement";
import Cart from "page/user/page/cart/Cart";
import NgonNguManagement from "page/admin/page/System/ngonNguManagement/NgonNguManagement";
import { BaiVietManagement } from "page/admin/page/baiVietManagement/BaiVietManagement";
import Payment from "page/user/page/payment/Payment";
import InfoBook from "page/user/page/infoBook/InfoBook";
// import { Contact } from '../page/user/page/contact/Contact';
import { Button, Result } from "antd";
import MaGiamManagement from "page/admin/page/System/maGiamManagement/MaGiamManagement";
import { AllBooks } from "page/user/page/allBooks/allBook";
import BookCategory from "page/user/page/bookCategory/BookCategory";
import DonHangManagement from "page/admin/page/donHangManagement/DonHangManagement";
import DanhGiaManagement from "page/admin/page/danhGiaManagement/DanhGiaManagement";
import Favourite from "page/user/page/favourite/Favourite";
import TaiKhoanManagement from "page/admin/page/AccountManagement/TaiKhoanManagement";
import { About } from "page/user/page/about/about";
import { BaiViet } from "page/user/page/baiViet/baiViet";
import KhachHangManagement from "page/admin/page/KhachHangManagement/KhachHangManagement";

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
        <Route path="/" element={<Layout1 />}>
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
        </Route>
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
          <Route path="bookManagement" element={<BookManagement />} />
          <Route path="theLoaiManagement" element={<TheLoaiManagement />} />
          <Route path="tacGiaManagement" element={<TacGiaManagement />} />
          <Route path="ngonNguManagement" element={<NgonNguManagement />} />
          <Route path="maGiamManagement" element={<MaGiamManagement />} />
          <Route path="baiVietManagement" element={<BaiVietManagement />} />
          <Route path="donHangManagement" element={<DonHangManagement />} />
          <Route path="danhGiaManagement" element={<DanhGiaManagement />} />
          <Route path="khachHangManagement" element={<KhachHangManagement />} />
          <Route
            path="nhaCungCapManagement"
            element={<NhaCungCapManagement />}
          />
          <Route
            path="nhaXuatBanManagement"
            element={<NhaXuatBanManagement />}
          />
          <Route path="login" element={<LoginAdmin />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </div>
  );
};
