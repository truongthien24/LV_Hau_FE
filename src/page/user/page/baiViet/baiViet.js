// import { Empty } from "antd";
// import useLoadingEffect from "fuse/hook/useLoadingEffect";
// import useGetDataBaiViet from "page/admin/page/baiVietManagement/hook/useGetDataBaiViet";
// import { useNavigate } from "react-router-dom";

// export const BaiViet = () => {
//   const {
//     baiVietData,
//     isDataLoading,
//     fetchData: fetchDetail,
//     isFetching: isFetchingDetail,
//   } = useGetDataBaiViet("0", "0");

//   const navigate = useNavigate();

//   const items = [];

//   const renderBaiViet = () => {
//     if (baiVietData?.length > 0) {
//       return baiVietData?.map((baiViet, index) => {
//         return (
//           <div key={index} className="rounded-[5px] bg-[#eaeaea]">
//             <img src={baiViet?.hinhAnh?.url} />
//             <div className="p-[10px]">
//               <span className="text-[12px] xl:text-[13px] text-[gray] mb-[5px]">
//                 {new Date(baiViet?.ngayTao).toLocaleDateString()}
//               </span>
//               <p className="font-[500]">{baiViet?.noiDung}</p>
//             </div>
//           </div>
//         );
//       });
//     } else {
//       <Empty description="Khong co du lieu" />;
//     }
//   };

//   useLoadingEffect(isDataLoading);
//   return (
//     <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
//       <div className="grid grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[15px] xl:gap-[20px] w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
//         {renderBaiViet()}
//       </div>
//     </div>
//   );
// };


import React from 'react'

export const BaiViet = () => {
  return (
    <div>baiViet</div>
  )
}
