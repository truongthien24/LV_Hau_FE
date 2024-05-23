import {
  Modal,
  Skeleton,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { setGridColumn } from "../helper";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import useUpdateSanPham from "../hook/useUpdateSanPham";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "page/user/shareComponent/Function/convertBase64";
import FormDatePicker from "page/admin/shareComponent/form/FormDatePicker";
import { Icon } from "assets/icon";
import { setConfirm } from "redux/action/homeAction";

export const ModalEditSanPham = (props) => {
  // Props
  const {
    title,
    isOpen,
    childrenForm,
    methodSubmit,
    methodCancel,
    dataEdit,
    fetcher,
    fetch,
    onShowSlice,
  } = props;

  // State
  const [image, setImage] = useState(null);

  const [fileImage, setFileImage] = useState(null);

  const [isSkeleton, setIsSkeleton] = useState(false);

  const [open, setOpen] = useState(false);

  const [isChangeImage, setIsChangeImage] = useState(false);

  const { thuongHieu, giamGia } =
    useSelector((state) => state.commonCode);

  const { mutate, isLoading: isSubmitting } = useUpdateSanPham();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // Form
  const APIEdit = useMemo(() => {
    return [
      {
        name: "maSanPham",
        type: "string",
        required: true,
        size: "1",
        label: "Mã sản phẩm",
      },
      {
        name: "tenSanPham",
        type: "string",
        required: true,
        size: "1",
        label: "Tên sản phẩm",
      },
      {
        name: "namSanXuat",
        type: "date",
        required: true,
        label: "Năm sản xuất",
        max: new Date(),
      },
      {
        name: "thuongHieu",
        type: "select",
        dataSelect: thuongHieu?.map((tg) => {
          return {
            label: tg?.tenThuongHieu,
            value: tg?._id,
          };
        }),
        label: "Thương hiệu",
      },
      {
        name: "loaiSanPham",
        type: "select",
        dataSelect: [
          { label: "Văn phòng", value: 0 },
          { label: "Gaming", value: 1 },
          { label: "Siêu mỏng", value: 2 },
        ],
        required: true,
        label: "Loại sản phẩm",
      },
      {
        name: "tinhTrang",
        type: "select",
        dataSelect: [
          { label: "New Arrival", value: 0 },
          { label: "Hot", value: 1 },
          { label: "Old", value: 2 },
        ],
        required: true,
        label: "Tình trạng",
      },
      {
        name: "gia",
        type: "number",
        required: true,
        label: "Giá",
      },
      {
        name: "soLuong",
        type: "number",
        required: true,
        label: "Số lượng",
      },
      {
        name: "khuyenMai",
        type: "select",
        label: "Khuyến mãi",
        dataSelect: [
          {
            label: "Không có khuyến mãi",
            value: null,
          },
          ...giamGia?.map((tg) => {
            return {
              label: tg?.tenKhuyenMai,
              value: tg?._id,
            };
          }),
        ],
      },
    ];
  }, [thuongHieu, giamGia]);

  const validationSchema = yup.object().shape({
    soLuong: yup
      .number()
      .required("Yêu cầu nhập vào")
      .min(1, "Số lượng phải lớn hơn 0"),

    gia: yup
      .number()
      .required("Yêu cầu nhập vào")
      .min(1, "Giá tiền ko được nhập âm"),
  });

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    method: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (dataEdit) {
      reset({
        ...dataEdit,
        hinhAnh: dataEdit?.hinhAnh,
        namXuatBan: dataEdit?.namXuatBan,
      });
    }
  }, [dataEdit]);

  // Method
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    setValue("hinhAnh", {
      required: true,
      url: base64,
      public_id: null,
    });
  };

  const submitForm = async (data) => {
    await mutate({
      Data: {
        ...data,
        thuongHieu: data?.maThuongHieu,
      },
      onSuccess: async (msg) => {
        toast.success(msg?.data?.message);
        await fetcher();
        await fetch();
        handleCancel();
      },
      onError: async (err) => {
        toast.error(err?.error);
      },
    });
    await dispatch(
      setConfirm({
        status: "close",
      })
    );
  };

  const handleSubmitData = async (data) => {
    await dispatch(
      setConfirm({
        status: "open",
        method: () => submitForm(data),
      })
    );
  };

  const handleCancel = () => {
    methodCancel();
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const renderInput = (item) => {
    if (item.type === "select") {
      return (
        <div
          className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${
            errors?.[item.name]?.message ? "border-orange-400" : ""
          }`}
        >
          <select className="w-full outline-none" {...register(`${item.name}`)}>
            {item.dataSelect?.map((op, index) => {
              return <option value={op.value}>{op.label}</option>;
            })}
          </select>
        </div>
      );
    } else if (item.type === "textarea") {
      return (
        <textarea
          {...register(item.name)}
          className="border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] min-h-[120px] max-h-[120px] w-full"
        />
      );
    }  else if (item.type === "string-readOnly") {
      return (
        <input
          // key={index}
          readOnly
          type={item.type}
          name={item.name}
          placeholder={`Điền vào ${item.label}...`}
          className={`border-[1px] border-solid border-[#b4b4b4] bg-[#cfcece] rounded-[5px] px-[15px] py-[7px] outline-none w-full`}
          {...register(`${item.name}`)}
        />
      );
    } else if (item.type === "date") {
      return (
        <FormDatePicker
          label={null}
          name={item.name}
          max={item.max}
          control={control}
        />
      );
    } else {
      return (
        <div
          className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${
            item?.disable ? "bg-[#cfcece]" : ""
          } ${errors?.[item.name]?.message ? "border-orange-400" : ""}`}
        >
          <input
            // key={index}
            type={item.type}
            readOnly={item.disable}
            name={item.name}
            max={item?.max}
            placeholder={`Điền vào ${item.label}...`}
            className={`w-[92%] outline-none ${
              item?.disable ? "bg-[#cfcece]" : ""
            }`}
            {...register(`${item.name}`)}
          />
          {errors?.[item.name] && (
            <div className="absolute right-2 md:right-1 top-[50%] translate-y-[-50%]">
              <span className="hover-span">
                <Icon color="#c80000" name="warning" />
              </span>
              <span className="absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden">
                {errors?.[item.name]?.message}
              </span>
            </div>
          )}
        </div>
      );
    }
  };

  useLoadingEffect(isSubmitting);

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={950}
    >
      {childrenForm}

      {isSkeleton ? (
        <Skeleton />
      ) : (
        <form
          className="grid grid-cols-5 grid-row-3 gap-[30px]"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="col-span-2 w-full row-span-3">
            <h5 className="mb-[7px] ml-[3px]">
              Photo
              <span className="text-[red]">*</span>
            </h5>
            <div className="rounded-[10px] border-solid border-[1px] border-[#cdcdcd] shadow-lg shadow-gray-400">
              <div className="p-[10px] w-full">
                <img
                  src={watch("hinhAnh")?.url}
                  className="h-full w-full rounded-[5px]"
                />
                {/* {renderImage} */}
              </div>
              <label
                className="w-full py-[10px] px-[20px] cursor-pointer bg-[#3790c7] block rounded-b-[10px]"
                htmlFor="imageRoom"
              >
                <UploadOutlined
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                />
              </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                id="imageRoom"
                className="hidden z-[-1] "
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-[15px] row-span-3">
            {APIEdit?.map((item, index) => {
              return (
                <div className={`${setGridColumn(item.size)}`} key={index}>
                  <h5 className="mb-[7px] ml-[3px]">
                    {t(`${item.label}`)}
                    {item.required && <span className="text-[red]">*</span>}
                  </h5>
                  {renderInput(item)}
                </div>
              );
            })}
          </div>
          <div className="col-span-5">
            <h5 className="mb-[7px] ml-[3px]">
              Mô tả
              <span className="text-[red]">*</span>
            </h5>
            <textarea
              required
              {...register("moTa")}
              className="border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] min-h-[80px] max-h-[120px] w-full"
            />
          </div>
          <div className="col-span-5 flex justify-end items-center">
            <button
              className="flex items-center justify-center bg-[white] py-[10px] px-[30px] rounded-[7px]"
              type="button"
              onClick={methodCancel}
            >
              {t("back")}
            </button>
            <button
              className="flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[30px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]"
              type="submit"
            >
              {t("save")}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
