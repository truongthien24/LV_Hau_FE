import { Empty } from "antd";
import _ from "lodash";
import useFindDataBook from "page/admin/page/RoomManagement/hook/useFindBook";
import Book from "page/user/component/AreaBook/compontents/Book";
import { COLOR } from "page/user/shareComponent/constant";
import React, { memo } from "react";
import { Grid } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const RelatedList = ({ data = {} }) => {
  const { sachData, isDataLoading, fetchData, isFetching } = useFindDataBook({
    theLoai: data?.tenTheLoai,
  });

  const renderSlide = () => {
    return sachData
      ?.filter((item) => item._id != data?._id)
      ?.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <Book data={slide} />
          </SwiperSlide>
        );
      });
  };

  return (
    <div className="py-[20px] grid grid-cols-1 gap-[20px] w-full">
      <h2
        className="px-[30px] py-[10px] text-[#fff]"
        style={{ backgroundColor: COLOR.primaryColor }}
      >
        Danh sách liên quan
      </h2>
      {sachData?.length > 0 ? (
        <Swiper
          grid={{
            rows: 1,
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            780: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            1000: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          spaceBetween={20}
          // pagination={{
          //     clickable: true,
          // }}
          modules={[Grid]}
          className="mySwiper w-full"
          style={{ padding: "10px 0" }}
        >
          {renderSlide()}
        </Swiper>
      ) : (
        <Empty description="Khong co sach nao lien quan" />
      )}
    </div>
  );
};

export default memo(RelatedList);
