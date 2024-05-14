import { Modal } from "antd";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useContext, useState } from "react";

const ModalRules = ({ open, onOpen, title }) => {
  return (
    <Modal
      className="!w-[90%] md:!w-[80%] lg:!w-[70%] xl:!w-[60%]"
      open={open}
      onCancel={() => {
        onOpen(false);
      }}
      footer={null}
      title={title}
    >
      {/* <h2
        className="text-[15px] lg:text-[20px] mb-[20px]"
        style={{ color: `${COLOR.primaryColor}` }}
      >
        Điều khoản của chúng tôi
      </h2> */}
      <div>Những điều cần lưu ý khi thuê sách tại cửa hàng BlackCat</div>
      <div>1. Khi thuê sách nhưng trả sách trễ hơn sẽ bị mất tiền cọc</div>
      <div>2. Khi làm hư hỏng sách sẽ mất tiền cọc</div>
      <div>
        3. Khi thuê sách 14 ngày nhưng trả lại sách trước 14 ngày thì giá thuê
        cũng không thay đổi.
      </div>
      <div> vd: Khi thuê sách 14 ngày nhưng 3 ngày trả lại</div>
      <div>4. Không được bom hàng quá 2 lần</div>
      <div>5. Trước khi mở hàng phải quay video lại.</div>
    </Modal>
  );
};

export default ModalRules;
