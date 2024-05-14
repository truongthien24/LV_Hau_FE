export const columns = (isMobile, isEdit) => {
  return [
    {
      name: "thongTinSanPham",
      title: "Sản phẩm",
      width: isMobile ? "45%" : "50%",
      visible: true,
    },
    {
      name: "giaThue",
      title: "Giá Thuê",
      width: isMobile ? "15%" : "10%",
      alignment: "center",
      visible: true,
    },
    {
      name: "gia",
      title: "Giá Cọc",
      width: isMobile ? "15%" : "10%",
      alignment: "center",
      visible: true,
    },
    {
      name: "soLuong",
      title: "Số lượng",
      width: isMobile ? "20%" : "15%",
      alignment: "center",
      visible: true,
    },
    {
      name: "thanhTien",
      title: "Thành tiền",
      width: isMobile ? "20%" : "15%",
      alignment: "center",
      visible: true,
    },
    {
      name: "action",
      title: "",
      width: isMobile ? "8%" : "10%",
      alignment: "center",
      visible: isEdit,
    },
  ];
};
