import React, { useMemo } from "react";
import ItemCategory from "./ItemCategory";
import useGetDataTheLoai from "page/admin/page/System/theLoaiManagement/hook/useGetDataTheLoai";

const ListCategory = ({ isMobile = false }) => {
  // const listCategory = [
  //   {
  //     key: "all",
  //     title: "All Books",
  //     path: "/allBooks",
  //     child: [],
  //   },
  //   {
  //     key: "art",
  //     title: "Art & Design",
  //     path: "/book?category=art",
  //     child: [],
  //   },
  //   {
  //     key: "comic",
  //     title: "Comic & Graphic Novel",
  //     path: "/book?category=comic",
  //     child: [],
  //   },
  //   {
  //     key: "language",
  //     title: "Language & Textbook",
  //     path: "/book?category=language",
  //     child: [],
  //   },
  //   {
  //     key: "love",
  //     title: "Love & Psychological",
  //     path: "/book?category=love",
  //     child: [],
  //   },
  // ];

  const { theLoaiData, isDataLoading, fetchData, isFetching } =
    useGetDataTheLoai("0", "0");

  const listCategory = useMemo(() => {
    return theLoaiData?.map((data, index) => {
      return {
        key: index,
        title: data?.tenTheLoai,
        path: `/book?category=${data?.tenTheLoai}`,
        child: [],
      };
    });
  }, [theLoaiData]);

  const renderListCategory = () => {
    return listCategory?.map((cat) => {
      return <ItemCategory data={cat} isMobile={isMobile} />;
    });
  };

  return <div>{renderListCategory()}</div>;
};

export default ListCategory;
