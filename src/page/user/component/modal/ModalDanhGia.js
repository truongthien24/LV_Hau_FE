import React from "react";
import { useTranslation } from "react-i18next";
import { FormReaction } from "../Form/FormReaction";
import { Modal } from "antd";

export const ModalDanhGia = (props) => {
  // Props
  const { methodCancel, title, open, data, fetcher } = props;

  // Somethings
  const { t } = useTranslation();

  // Return
  return (
    <Modal
      title={title}
      open={open}
      footer={null}
      width={700}
      onCancel={methodCancel}
    >
      <div className="backdrop-blur-md h-full rounded-[10px]">
        <div>
          <FormReaction setOpenDanhGia={methodCancel} data={data} fetcher={fetcher}/>
        </div>
      </div>
    </Modal>
  );
};
