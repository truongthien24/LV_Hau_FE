export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên nhà cung cấp",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "25%",
    },
    {
      title: "Địa chỉ nhà cung cấp",
      dataIndex: "diaChiNhaCungCap",
      key: "diaChiNhaCungCap",
      width: "25%",
    },

    {
      title: "Số điện thoại nhà cung cấp",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      width: "25%",
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
