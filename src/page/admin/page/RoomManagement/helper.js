export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên sách",
      dataIndex: "tenSach",
      key: "tenSach",
      width: "25%",
    },
    {
      title: "Thể loại",
      dataIndex: "tenTheLoai",
      key: "tenTheLoai",
      width: "15%",
    },

    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      width: "15%",
    },

    // {
    //   title: "Tong hop",
    //   dataIndex: "soLuong",
    //   key: "soLuong",
    //   width: "10%",
    //   cell: (cell) => {
    //     return (
    //       <span>
    //         {cell?.tenTheLoai} - {cell?.soLuong}
    //       </span>
    //     );
    //   },
    // },
    {
      title: "Tác giả",
      dataIndex: "tenTacGia",
      key: "tenTacGia",
      width: "20%",
    },
    {
      title: "Nhà xuất bản",
      dataIndex: "tenNhaXuatBan",
      key: "tenNhaXuatBan",
      width: "15%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "25%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "20%",
    },
  ];
};

// getDataTable
export const getDataTable = (data) => {
  const dataResult = [];
  data?.length > 0 &&
    data.map((item, index) => {
      const obj = { ...item, key: index };
      return dataResult.push(obj);
    });
  return dataResult;
};

export const setGridColumn = (size) => {
  if (size === "3") {
    return "col-span-3";
  } else if (size === "2") {
    return "col-span-2";
  } else {
    return "col-span-1";
  }
};
