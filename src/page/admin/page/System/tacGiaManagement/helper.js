import { COLOR, COLORChiTietTacGia } from "page/user/shareComponent/constant";

export const columns = (onOpenChiTietTacGia) => {
  return [
    {
      title: "Tên tác  giả",
      dataIndex: "tenTacGia",
      key: "tenTacGia",
      width: "25%",
    },
    {
      title: "Chi tiết tác giả",
      dataIndex: "chiTietTacGia",
      key: "chiTietTacGia",
      cell: (cell) => {
        return (
          <div
            className="w-fit flex items-center cursor-pointer py-[2px] px-[10px] rounded-[20px] justify-center text-[12px] text-[white]"
            style={{ backgroundColor: `${COLORChiTietTacGia.secondaryColor}` }}
            onClick={() => {
              onOpenChiTietTacGia({
                open: true,
                selector: cell,
              });
            }}
          >
            Nhấp vào để xem chi tiết
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
