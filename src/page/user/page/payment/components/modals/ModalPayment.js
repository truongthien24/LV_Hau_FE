import { Modal } from "antd";
import React, { useContext, useState } from "react";

const ModalPayment = ({ open, onOpen, title, data }) => {
    return (
        <Modal
            className="!w-[90%] 2xl:!w-[70%]"
            open={open}
            onCancel={() => {
                onOpen(false);
            }}
            footer={null}
            title={title}
        >
            <iframe src={data?.payUrl} className="w-full h-[80vh]"/>
        </Modal>
    )
}

export default ModalPayment