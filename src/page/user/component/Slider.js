import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = (props) => {
  // Props
  const { data } = props;

  // Method
  const renderSlider = () => {
    return data?.map((item, index) => {
      return (
        <SwiperSlide>
          <div
            className={`text-[white] h-[290px] md:h-screen`}
            style={{
              backgroundImage: `url('${item.image}')`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      pagination={true}
      mousewheel={false}
      preventInteractionOnTransition={false}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      slidesPerView={1}
    >
      {renderSlider()}
    </Swiper>
  );
};
