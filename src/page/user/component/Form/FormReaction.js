import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../../assets/icon";
import _ from "lodash";
import { COLOR } from "page/user/shareComponent/constant";
import useUpdateDanhGia from "page/admin/page/danhGiaManagement/hook/useUpdateDanhGia";
import toast from "react-hot-toast";

export const FormReaction = (props) => {
  // Props
  const { data, fetcher, setOpenDanhGia } = props;

  // State
  const [number, setNumber] = useState(3);

  // Somethings
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const { t } = useTranslation();
  const { mutate, isLoading } = useUpdateDanhGia();

  // Form
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    method: "onChange",
    defaultValues: {
      noiDung: "",
    },
  });

  useEffect(() => {
    setValue("soSao", number);
  }, [number]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(data);
    }
  }, [data]);

  // Method
  const handleSubmitData = async (dataForm) => {
    await mutate({
      Data: { ...data, noiDung: dataForm?.noiDung },
      onSuccess: async (res) => {
        await fetcher();
        toast.success(res.data.message);
        setOpenDanhGia()
      },
      onError: (req) => {
        toast.error(req.error.message);
      },
    });
  };

  const renderDanhGiaSao = () => {
    return <Rate tooltips={desc} onChange={setNumber} value={number} />;
  };

  // Return
  return (
    <form className="w-full" onSubmit={handleSubmit(handleSubmitData)}>
      <div className="flex items-center w-full">
        <textarea
          required
          {...register("noiDung")}
          className=" text-[13px] md:text-[15px] py-[10px] px-[20px] border-[1px] border-solid border-[#eaeaea] rounded-[10px] bg-transparent outline-none w-full h-[140px] max-h-[140px] min-h-[140px] md:h-[170px] md:max-h-[170px] md:min-h-[170px] lg:h-[200px] lg:max-h-[200px] lg:min-h-[200px]"
        />
      </div>
      {/* <div className="flex items-center py-[10px] px-[20px] rounded-[10px] my-[10px] backdrop-blur-md bg-[#ffffff73]">
        {
          renderDanhGiaSao()
        }
      </div> */}
      <button
        className="flex items-center justify-center py-[10px] px-[10px] rounded-[10px] w-full duration-500 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#40956dd1] mt-[20px]"
        style={{ backgroundColor: COLOR.primaryColor }}
      >
        <Icon name="paper" color="#fff" />
        <span className="ml-[10px] text-[white]">{t("send")}</span>
      </button>
    </form>
  );
};
