export const columns = (onClickFuncc) => {
  return [
    {
      title: "Tên bài viết",
      dataIndex: "tenBaiViet",
      key: "tenBaiViet",
      width: "25%",
    },

    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "20%",
    },
    {
      title: "Nội Dung",
      dataIndex: "noiDung",
      key: "noiDung",
      width: "25%",
    },

    {
      title: "Ngày tạo bài viết",
      dataIndex: "ngayTao",
      key: "ngayTao",
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
