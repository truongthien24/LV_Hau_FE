export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên khach hang",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Dia chi",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "So dien thoại",
      dataIndex: "sdt",
      key: "sdt",
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
