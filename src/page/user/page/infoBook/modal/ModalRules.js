import { Modal } from "antd";

const ModalRules = ({ open, onOpen, title, data }) => {
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
      <div>{data?.chiTietTacGia}</div>
    </Modal>
  );
};

export default ModalRules;
