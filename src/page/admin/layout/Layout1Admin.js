import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation/Navigation";
import TabMenu from "./tabMenu/TabMenu";
import { useNavigate } from "react-router-dom";
import useGetAccountByID from "../page/AccountManagement/hook/useGetAccountByID";
import { useDispatch } from "react-redux";
import { setUserInfo } from "redux/action/homeAction";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

export const LayoutContextAdmin = createContext(null);

export const Layout1Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = window.location;

  const [id, setId] = useState(null);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      if (["admin", "employee"].includes(jwtDC?.users?.loaiTaiKhoan)) {
        setId(jwtDC?.users?._id);
      } else {
        navigate("/");
        toast.error("Tài khoản không được phân quyền");
      }
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/admin/login");
    }
  }, [pathname]);

  const { accountData, isDataLoading, fetchData, isFetching } =
    useGetAccountByID({ id: id });

  useEffect(() => {
    if (accountData) {
      dispatch(setUserInfo(accountData));
    }
  }, [accountData]);

  return (
    <LayoutContextAdmin.Provider value={{ fetchDataAccount: fetchData }}>
      <div className="flex h-screen">
        <Navigation />
        <div className="w-[calc(100%-250px)] h-full">
          <TabMenu />
          <div className="px-[20px] py-[10px] h-[92%]">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContextAdmin.Provider>
  );
};
