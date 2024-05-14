import React from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  MailOutlined,
  BookOutlined,
  SettingOutlined,
  HomeOutlined,
  EditOutlined,
  WifiOutlined,
  WindowsOutlined,
  SmileOutlined,
  UserAddOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const items = [
    getItem(
      <div
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Dashboard
      </div>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/accountManagement");
        }}
        Quản
        lý
      >
        Quản lý tài khoản
      </div>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/bookManagement");
        }}
      >
        Quản lý sách
      </div>,
      "3",
      <BookOutlined />
    ),
    getItem("Hệ thống", "sub1", <SettingOutlined />, [
      getItem(
        <div
          onClick={() => {
            navigate("/admin/theLoaiManagement");
          }}
        >
          Quản lý Thể loại
        </div>,
        "4",
        <SmileOutlined />
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/tacGiaManagement");
          }}
        >
          Quản lý Tác giả
        </div>,
        "5",
        <UserAddOutlined />
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/nhaCungCapManagement");
          }}
        >
          Quản lý Nhà cung cấp
        </div>,
        "6",
        <HomeOutlined />
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/nhaXuatBanManagement");
          }}
        >
          Quản lý Nhà Xuất bản
        </div>,
        "7",
        <HomeOutlined />
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/ngonNguManagement");
          }}
        >
          Quản lý ngôn ngữ
        </div>,
        "8",
        <EditOutlined />
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/maGiamManagement");
          }}
        >
          Quản lý mã giảm giá
        </div>,
        "9",
        <PercentageOutlined />
      ),
    ]),
    // getItem("Booking", "sub2", <MailOutlined />, [
    //   getItem(
    //     <div
    //       onClick={() => {
    //         navigate("/admin/donHangManagement");
    //       }}
    //     >
    //       Quản lý đơn hàng
    //     </div>,
    //     "10"
    //   ),
    //   getItem(
    //     <div
    //       onClick={() => {
    //         navigate("/admin/bookingService");
    //       }}
    //     >
    //       Booking Service
    //     </div>,
    //     "11"
    //   ),
    // ]),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/donHangManagement");
        }}
      >
        Quản lý đơn hàng
      </div>,
      "10",
      <MailOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/danhGiaManagement");
        }}
      >
        Quản lý đánh giá
      </div>,
      "12",
      <ContainerOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/baiVietManagement");
        }}
      >
        Quản lý bài viết
      </div>,
      "13",
      <WindowsOutlined />
    ),
    getItem(
      <div
        onClick={() => {
          navigate("/admin/khachHangManagement");
        }}
      >
        Quản lý khach hang
      </div>,
      "14",
      <WindowsOutlined />
    ),
  ];

  return (
    <div className="admin__navigation bg-[#000B16] w-[256px] h-[calc(100vh-100px)]">
      {/* <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
                marginBottom: 16,
            }}
            >
            { <MenuFoldOutlined />}
            </Button> */}
      <div className="flex items-center justify-center py-[20px]">
        <img src="/images/logo.png" className="w-[100px]" />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
