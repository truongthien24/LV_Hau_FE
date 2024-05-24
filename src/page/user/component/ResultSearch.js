import React, { useEffect } from "react";
import { Empty } from "antd";
import OutsideClickDetector from "component/OutSide/OutSideClickDetector";
import { useNavigate } from "react-router-dom";
const ResultSearch = ({ data, resultRef, searchRef }) => {

  // const { sachData, isDataLoading, fetchData, isFetching } = useFindDataBook({tenSach: data});
  const sachData = []

  const navigate = useNavigate();

  // hàm chuẩn hóa Unicode và loại bỏ dấu, sau đó chuyển đổi chuỗi kết quả thành chữ thường
  function removeAccentsAndLowerCase(str) {
    // Chuẩn hóa Unicode và loại bỏ dấu
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Chuyển đổi thành chữ thường
    const lowerCaseStr = normalizedStr.toLowerCase();
    return lowerCaseStr.trim();
  }
  const renderResult = () => {
    if (sachData?.length > 0) {
        return sachData.map((sach, index) => (
          <div
            className="flex rounded-[5px] duration-500 cursor-pointer hover:bg-[#eaeaea]"
            onClick={() => {
              navigate(`/infoBook/${sach?._id}`);
              resultRef.current.style.display = "none";
            }}
            key={index}
          >
            <img
              src={sach?.hinhAnh?.url}
              className="w-[45px] h-full mr-[10px]"
              alt={`Book Thumbnail ${index}`}
            />
            <div>
              <h5 className="text-[13px]">{sach?.tenSach}</h5>
              <span className="text-[12px] text-[gray]">
                {sach?.tenTheLoai}
              </span>
            </div>
          </div>
        ));
    }

    // Hiển thị Empty component nếu sachData không có dữ liệu
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  };

  return (
    <OutsideClickDetector
      OutSideRef={resultRef}
      InSideRef={searchRef}
      classNames="absolute top-[120%] left-0 w-full bg-[#fff] rounded-[5px] shadow-md hidden max-h-[350px] overflow-y-scroll"
    >
      {/* <div className="absolute top-[120%] left-0 w-full bg-[#fff] rounded-[5px] shadow-md hidden max-h-[350px] overflow-y-scroll"> */}
      <div className="p-[10px] grid grid-cols-1 gap-[10px]">
        {renderResult()}
      </div>
      {/* </div> */}
    </OutsideClickDetector>
  );
};

export default ResultSearch;
