import { Empty, Modal } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react'

const ModalHistoryOrder = ({ open, onOpen, title, data, onOrderDetail }) => {

    const renderData = () => {
        if (!_.isEmpty(data)) {
            /// map là xử lý mảng
            return data?.map((donHang, index) => {
                return (
                    <div className="grid grid-cols-1 gap-[10px] bg-[#84bcaf4a] p-[10px] rounded-[5px]">
                        <div className="flex justify-between text-[13px] xl:text-[14px]">
                            <div className="flex items-center">
                                <h5 className="mr-[10px]">#{donHang?.maDonHang}</h5>
                                <div className="text-[12px] xl:text-[13px] flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-[5px]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {donHang?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayBatDau +
                                        " - " +
                                        donHang?.thongTinGiaoHang?.ngayNhanHangDuKien?.ngayKetThuc}
                                </div>
                            </div>
                            <button
                                className="text-[12px] lg:text-[13px] font-[600] text-[#f78700]"
                                onClick={() => {
                                    onOrderDetail({
                                        open: true,
                                        selector: donHang,
                                    });
                                }}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                        <div className="flex items-center text-[12px] xl:text-[13px]">
                            <div>
                                <strong>
                                    Loại sách đang thuê : {donHang?.danhSach?.length}
                                </strong>
                            </div>
                            <div className="ml-[10px]">
                                {" "}
                                <strong>
                                    {" "}
                                    Tổng giá: {donHang?.tongGia?.toLocaleString()} VND
                                </strong>
                            </div>
                        </div>
                    </div>
                );
                // length để kiểm tra mãng hoặc chuỗi đó có bao nhiêu phần tử
            });
        } else {
            return <Empty description="Chưa có đơn hàng nào" />;
        }
    }
    return (
        <Modal
            className="!w-[90%] 2xl:!w-[70%]"
            open={open}
            onCancel={() => {
                onOpen({
                    open: false,
                });
            }}
            footer={null}
            title={title}
        >
            <div className="grid grid-cols-1 gap-[10px] mt-[15px]">
                {renderData()}
            </div>
        </Modal>
    )
}

export default ModalHistoryOrder