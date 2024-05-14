import React from "react";
import { Grid, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import Book from "./Book";

const SliderBook = (props) => {
  const { data } = props;

  const renderSlide = () => {
    return data?.map((slide, index) => {
      return (
        <SwiperSlide key={index}>
          <Book data={slide} />
        </SwiperSlide>
      );
    });
  };
  return (
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
      className="mySwiper"
      style={{ padding: "10px 0" }}
    >
      {renderSlide()}
    </Swiper>
  );
};

export default SliderBook;
