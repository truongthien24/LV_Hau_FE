import { COLOR } from "page/user/shareComponent/constant";

export const columns = (onOpenNoiDungDanhGia) => {
  return [
    {
      title: "Tên tài khoản",
      dataIndex: "tenDangNhap",
      key: "tenDangNhap",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Tên sách",
      dataIndex: "tenSach",
      key: "tenSach",
      width: "25%",
    },
    {
      title: "Nội dung",
      dataIndex: "noiDung",
      key: "tenSach",
      width: "25%",
      cell: (cell) => {
        return (
          <div
            className="w-fit flex items-center cursor-pointer py-[2px] px-[10px] rounded-[20px] justify-center text-[12px] text-[white]"
            style={{ backgroundColor: `${COLOR.secondaryColor}` }}
            onClick={() => {
              onOpenNoiDungDanhGia({
                open: true,
                selector: cell,
              });
            }}
          >
            Xem chi tiết
          </div>
        );
      },
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
