export const columns = (onClickFuncc) => {
    return [
      {
        title: "Tên sản phẩm",
        dataIndex: "tenSanPham",
        key: "tenSanPham",
        width: "25%",
      },
      {
        title: "Loại sản phẩm",
        dataIndex: "loaiSanPham",
        key: "loaiSanPham",
        width: "15%",
        cell: (cell) => {
          return (
            <span
              className="font-[500]"
        
            >
              {cell?.loaiSanPham == 0 ? "Văn phòng" : cell?.loaiSanPham == 1 ? "Gaming" : "Siêu mỏng"}
            </span>
          );
        },
      },
  
      {
        title: "Số lượng",
        dataIndex: "soLuong",
        key: "soLuong",
        width: "15%",
      },
      {
        title: "Thương hiệu",
        dataIndex: "tenThuongHieu",
        key: "tenThuongHieu",
        width: "15%",
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
  