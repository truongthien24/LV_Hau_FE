import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { Icon } from "assets/icon";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useGetPasswordByEmail from "page/admin/page/AccountManagement/hook/useGetPasswordByEmail";
// import useGetPasswordByEmail from "page/admin/page/accountManagement/hook/useGetPasswordByEmail";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const ModalForgetPassword = ({ open, onCancel, title }) => {
  const { t } = useTranslation();

  const { mutate, isLoading } = useGetPasswordByEmail();

  const method = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required("Vui lòng nhập email vào"),
      })
    ),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = method;

  const getPassword = async (data) => {
    await mutate({
      Data: data,
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        onCancel();
      },
      onError: (err) => {
        toast.error(err?.error?.message);
      },
    });
  };

  useLoadingEffect(isLoading);

  return (
    <Modal
      className="!w-[90%] md:!w-[80%] lg:!w-[80%] xl:!w-[70%] 2xl:!w-[60%]"
      open={open}
      onCancel={onCancel}
      footer={null}
      title={title}
    >
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(getPassword)}>
          <div>
            <h5 className="mb-[7px] text-[14px]">Nhập email đã đăng ký:</h5>
            <div
              className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${
                errors?.email?.message ? "border-orange-400" : ""
              }`}
            >
              <input
                name="email"
                placeholder={`Điền vào email...`}
                className={`w-[95%] outline-none bg-transparent`}
                {...register(`email`)}
              />
              {errors?.email && (
                <div className="absolute right-2 md:right-4 top-[50%] translate-y-[-50%]">
                  <span className="hover-span">
                    <Icon color="#c80000" name="warning" />
                  </span>
                  <span className="absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden">
                    {errors?.email.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[40px] grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center bg-[white] py-[12px] rounded-[7px]"
              type="button"
              onClick={onCancel}
            >
              {t("back")}
            </button>
            <button
              className="flex items-center justify-center bg-[#498374] text-white py-[12px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
              type="submit"
            >
              {t("Lấy lại mật khẩu")}
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalForgetPassword;
