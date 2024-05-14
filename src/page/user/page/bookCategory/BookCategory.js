import useLoadingEffect from "fuse/hook/useLoadingEffect";
import React from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import useGetDataBook from "page/admin/page/RoomManagement/hook/useGetDataBook";
import AreaBook from "page/user/component/AreaBook";
import { Empty } from "antd";

const BookCategory = () => {
  const { sachData, isDataLoading, fetchData, isFetching } = useGetDataBook(
    "0",
    "0"
  );

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  console.log(category);

  useLoadingEffect(isDataLoading);

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="flex flex-col w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        {(sachData?.filter((sach) => sach?.tenTheLoai === category)).length >
        0 ? (
          <AreaBook
            data={{
              title: category,
              data: sachData?.filter((sach) => sach?.tenTheLoai === category),
            }}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chưa có sản phẩm nào"
          />
        )}
      </div>
    </div>
  );
};

export default BookCategory;
