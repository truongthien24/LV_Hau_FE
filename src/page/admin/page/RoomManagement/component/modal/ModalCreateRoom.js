import { Badge, Modal, Popover, Skeleton, DatePicker } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "../../../../../../assets/icon";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { setGridColumn } from "../../helper";
import { FormAddRoom } from "../form/FormAddRoom";
import useCreateBook from "../../hook/useCreateBook";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "page/user/shareComponent/Function/convertBase64";
import FormDatePicker from "page/admin/shareComponent/form/FormDatePicker";

export const ModalCreateRoom = (props) => {
  // Props
  const { title, isOpen, childrenForm, methodCancel, fetcher, fetch } = props;

  // State
  const [image, setImage] = useState(null);

  const [isSkeleton, setIsSkeleton] = useState(false);

  const { mutate, isLoading: isSubmitting } = useCreateBook();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { tacGia, theLoai, nhaXuatBan, nhaCungCap, ngonNgu, giamGia } =
    useSelector((state) => state.commonCode);

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);

  useLoadingEffect(isSubmitting);

  // Form
  const APIEdit = useMemo(() => {
    return [
      {
        name: "tenSach",
        type: "string",
        required: true,
        size: "1",
        label: "Tên sách",
      },
      {
        name: "maSach",
        type: "string",
        required: true,
        size: "1",
        label: "Mã sách",
      },
      {
        name: "theLoai",
        type: "select",
        dataSelect: theLoai?.map((tg) => {
          return {
            label: tg?.tenTheLoai,
            value: tg?._id,
          };
        }),
        required: true,
        label: "Thể loại",
      },
      {
        name: "nhaXuatBan",
        type: "select",
        dataSelect: nhaXuatBan?.map((tg) => {
          return {
            label: tg?.tenNXB,
            value: tg?._id,
          };
        }),
        required: true,
        label: "Nhà xuất bản",
      },
      {
        name: "tacGia",
        type: "string",
        type: "select",
        dataSelect: tacGia?.map((tg) => {
          return {
            label: tg?.tenTacGia,
            value: tg?._id,
          };
        }),
        required: true,
        label: "Tác giả",
      },
      {
        name: "namXuatBan",
        type: "date",
        required: true,
        label: "Năm xuất bản",
        max: new Date(),
      },
      {
        name: "nhaCungCap",
        type: "select",
        dataSelect: nhaCungCap?.map((tg) => {
          return {
            label: tg?.tenNhaCungCap,
            value: tg?._id,
          };
        }),
        required: true,
        label: "Nhà cung cấp",
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
        name: "tienCoc",
        type: "number",
        required: true,
        label: "Tiền cọc",
      },
      {
        name: "soLuong",
        type: "number",
        required: true,
        label: "Số lượng",
      },
      {
        name: "kichThuoc",
        type: "string",
        required: true,
        label: "Kích thước",
      },
      {
        name: "soTrang",
        type: "number",
        required: true,
        label: "Số trang",
      },
      {
        name: "ngonNgu",
        type: "select",
        dataSelect: ngonNgu?.map((tg) => {
          return {
            label: tg?.tenNgonNgu,
            value: tg?._id,
          };
        }),
        required: true,
        label: "Ngôn ngữ",
      },
      {
        name: "quocGia",
        type: "select",
        dataSelect: [
          { label: "Hàn Quốc", value: "HQ" },
          { label: "Việt Nam", value: "VN" },
          { label: "Mỹ", value: "EN" },
        ],
        required: true,
        label: "Quốc gia",
      },

      {
        name: "biaSach",
        type: "string",
        required: true,
        label: "Bìa sách",
      },
      {
        name: "giamGia",
        type: "select",
        label: "Giam gia",
        dataSelect: [
          {
            label: "Không có giảm giá",
            value: null,
          },
          ...giamGia?.map((tg) => {
            return {
              label: tg?.tenMaGiamGia,
              value: tg?._id,
            };
          }),
        ],
      },
    ];
  }, [tacGia, theLoai, nhaXuatBan, nhaCungCap, ngonNgu, giamGia]);

  const validationSchema = yup.object().shape({
    tienCoc: yup
      .number()
      .required()
      .oneOf([yup.ref("gia")], "Phải bằng giá sách"),
    soLuong: yup
      .number()
      .required("Yêu cầu nhập vào")
      .min(1, "Số lượng phải lớn hơn 0"),

    gia: yup
      .number()
      .required("Yêu cầu nhập vào")
      .min(1, "Giá tiền ko được nhập âm"),

    soTrang: yup
      .number()
      .required("Không được để trống")
      .min(1, "Số trang không được để âm"),
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
    defaultValues: {
      tenSach: "",
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDF9695aEHL20tZNMzJ26nIGr5AYMKr_eaoxXWtDkngU8M8KXhqPQXkhyamMWJ1mvbeYU&usqp=CAU",
    },
  });

  // Method
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("base64", base64);

    setImage(base64);
    setValue("hinhAnh", base64);
  };

  const handleSubmitData = async (data) => {
    await mutate({
      Data: { ...data },
      onSuccess: async (msg) => {
        toast.success(msg?.data?.message);
        await fetch();
        handleCancel();
      },
      onError: async (err) => {
        toast.error(err?.error?.message);
      },
    });
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
    } else if (item.type === "array") {
      return (
        <div className="grid grid-cols-5 gap-[20px]">
          {getValues("soLuongPhong")?.map((btn, index) => {
            return (
              <Badge.Ribbon
                color={`${btn?.tinhTrang ? "orange" : "green"}`}
                key={index}
              >
                <button
                  type="button"
                  className={`w-full p-[10px] bg-[white] shadow-md shadow-gray-300 rounded-[5px] duration-200 hover:translate-x-[-3px] ${
                    btn?.tinhTrang
                      ? "hover:shadow-orange-400"
                      : "hover:shadow-green-400"
                  }`}
                >
                  {btn?.[item.dataItemName]}
                </button>
              </Badge.Ribbon>
            );
          })}
          {(getValues("soLuongPhong")?.length < 5 ||
            !getValues("soLuongPhong")?.length) && (
            <Popover
              content={
                <FormAddRoom
                  arrRoom={getValues("soLuongPhong")}
                  setValue={setValue}
                  handleOpenChange={handleOpenChange}
                />
              }
              title="Title"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <button
                type="button"
                className={`w-full p-[10px] bg-[white] shadow-md shadow-gray-300 rounded-[5px] duration-200 hover:shadow-gray-400`}
              >
                +
              </button>
            </Popover>
          )}
        </div>
      );
    } else if (item.type === "string-readOnly") {
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
            name={item.name}
            readOnly={item.disable}
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
                {errors?.[item.name].message}
              </span>
            </div>
          )}
        </div>
      );
    }
  };

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
          <div className="col-span-2 w-full row-span-4">
            <h5 className="mb-[7px] ml-[3px]">
              Photo
              <span className="text-[red]">*</span>
            </h5>
            <div className="rounded-[10px] border-solid border-[1px] border-[#cdcdcd] shadow-lg shadow-gray-400">
              <div className="p-[10px] w-full">
                <img
                  src={watch("hinhAnh")}
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
              Nội dung
              <span className="text-[red]">*</span>
            </h5>
            <textarea
              required
              {...register("noiDung")}
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
              {t("thêm")}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
