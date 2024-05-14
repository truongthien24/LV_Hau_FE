import { Modal } from "antd";
import FormNumberPhone from "page/admin/shareComponent/form/FormNumberPhone";
import FormTextField from "page/admin/shareComponent/form/FormTextField";
import { COLOR } from "page/user/shareComponent/constant";
import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  GoogleMap,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import useUpdateAccount from "page/admin/page/AccountManagement/hook/useUpdateAccount";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LayoutContext } from "page/user/layout/Layout1";
import _ from "lodash";
import { setConfirm } from "redux/action/homeAction";
import { Confirm } from "component/Confirm/Confirm";

const center = {
  lat: 14.0583,
  lng: 108.2772,
};

const ModalAddInfoPayment = ({ open, onOpen, title, data }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = React.useState(null);
  const { fetchDataAccount } = useContext(LayoutContext);
  const { userInfo } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCdnfsBLV_MKpX_BZdCU_O4iLu5-q6l-CI",
  });

  const { mutate, isLoading } = useUpdateAccount();

  const defaultValues = {
    hoTen: "",
    soDt: null,
    diaChi: "",
  }

  const method = useForm({
    mode: "onSubmit",
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    watch,
    control,
    formState: { errors },
  } = method;

  useEffect(() => {
    if (!_.isEmpty(data)) {
      reset(data);
    } else {
      reset(defaultValues)
    }
  }, [data, open])

  const addInfoPayment = async (data) => {
    let newInfoNhanHang = userInfo?.thongTinNhanHang;
    if (data?.id != undefined || data?.id != null) {
      newInfoNhanHang[data?.id] = { soDt: data?.soDt, hoTen: data?.hoTen, diaChi: data?.diaChi };
    } else {
      newInfoNhanHang.push(data);
    }
    await mutate({
      Data: {
        ...userInfo,
        thongTinNhanHang: newInfoNhanHang?.map((info, index) => {
          return { ...info, id: index };
        }),
      },
      onSuccess: (res) => {
        fetchDataAccount();
        !data?.id && onOpen({
          open: false,
          initData: null
        });
        toast.success(res?.data?.message);
      },
      onError: (err) => {
        toast.error(err?.rror.message);
      },
    });
  };

  const deleteInfoPayment = async () => {
    await dispatch(setConfirm({
      status: 'open',
      method: async () => {
        let newInfoNhanHang = userInfo?.thongTinNhanHang;
        newInfoNhanHang.splice(data?.id, 1);
        await mutate({
          Data: {
            ...userInfo,
            thongTinNhanHang: newInfoNhanHang?.map((info, index) => {
              return { ...info, id: index };
            }),
          },
          onSuccess: (res) => {
            fetchDataAccount();
            dispatch(setConfirm({
              status: 'close',
              method: null
            }))
            onOpen({
              open: false,
              initData: null
            });
            toast.success(res?.data?.message);
          },
          onError: (err) => {
            toast.error(err?.rror.message);
          },
        });
      }
    }))
  }

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onPlaceChanged = (autocomplete) => {
    // Get the selected place details
    const place = autocomplete.getPlace();

    // Check if the selected place is in Vietnam
    if (place && place.address_components) {
      const countryComponent = place.address_components.find((component) =>
        component.types.includes("country")
      );

      if (countryComponent && countryComponent.short_name === "VN") {
        setSelectedPlace(place);
      } else {
        alert("Please select a location in Vietnam.");
      }
    }
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <Modal
        className="!w-[90%] md:!w-[80%] lg:!w-[70%] xl:!w-[60%]"
        open={open}
        onCancel={() => {
          onOpen({
            open: false,
            initData: null
          });
        }}
        footer={null}
        title={title}
      >
        <h2
          className="text-[15px] lg:text-[20px] mb-[20px]"
          style={{ color: `${COLOR.primaryColor}` }}
        >
          {data ? 'Chỉnh sửa thông tin nhận hàng' : 'Thêm thông tin nhận hàng'}
        </h2>
        <FormProvider {...method}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-[20px]"
            onSubmit={handleSubmit(addInfoPayment)}
          >
            {/* <div className="w-full bg-[#f3f3f3] p-[15px] flex flex-col justify-between h-full"></div> */}
            <div className="col-span-1">
              <FormTextField control={control} label="Họ và tên" name="hoTen" />
            </div>
            <div className="col-span-1">
              <FormNumberPhone
                control={control}
                label="Số điện thoại"
                name="soDt"
              />
            </div>
            <div className="col-span-2">
              <FormTextField control={control} label="Địa chỉ" name="diaChi" />
            </div>
            <div className="col-span-2">
              <h5>Chọn từ bản đồ: </h5>
              {/* {isLoaded ? (
              <GoogleMap
                id="map"
                mapContainerStyle={{
                  height: "400px",
                  width: "100%",
                }}
                center={center}
                zoom={6}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
              </GoogleMap>
            ) : (
              <></>
            )} */}
            </div>
            <div className="col-span-2 flex justify-end">
              {
                data
                &&
                <button
                  className="text-[#fff] text-[11px] md:text-[15px] p-[10px] rounded-[5px] flex items-center justify-center mr-[10px]"
                  type="button"
                  onClick={deleteInfoPayment}
                  style={{
                    backgroundColor: `${COLOR.cancelColor}`,
                  }}
                >
                  Xóa
                </button>
              }
              <button
                className="text-[#fff] text-[11px] md:text-[15px] p-[10px] rounded-[5px] flex items-center justify-center"
                type="submit"
                style={{
                  backgroundColor: `${COLOR.primaryColor}`,
                }}
              >
                Lưu
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
      <Confirm />
    </>
  );
};

export default ModalAddInfoPayment;
