import { Icon } from "assets/icon";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/action/homeAction";
import { COLOR } from "../shareComponent/constant";
import toast from "react-hot-toast";
import useFindDataBook from "page/admin/page/RoomManagement/hook/useFindBook";
import { Empty } from "antd";
import ResultSearch from "./ResultSearch";

const FormSearch = (props) => {
  // Props
  const { data } = props;

  const searchResultRef = useRef(null);
  const searchFormRef = useRef(null);

  const dispatch = useDispatch();

  const defaultValues = {
    valueSearch: "",
  };

  const method = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const { reset, register, setValue, getValues, watch, handleSubmit } = method;

  const onSubmit = (data) => {
    // toast.error("Chức năng đang phát triển");
  };

  return (
    <FormProvider {...method}>
      <form
        ref={searchFormRef}
        className={`min-w-[350px] border-[2px] border-[#498374] border-solid rounded-[5px] relative`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="w-full px-[20px] py-[8px] text-[12px] outline-none"
          placeholder="Nhập tên sách, tên tác giả, tên nhà xuất bản"
          {...register("valueSearch")}
          onKeyDown={(e) => {
            searchResultRef.current.style.display = "block";
          }}
          onFocus={(e) => {
            if (e.target.value) {
              searchResultRef.current.style.display = "block";
            }
          }}
        />
        <button
          className={`absolute right-[-10px] top-[50%] translate-y-[-50%] bg-[#498374] w-[50px] h-[50px] flex items-center justify-center text-[#fff] rounded-[50%] border-none hover:shadow-md hover:shadow-[#498374] duration-200`}
        >
          <Icon name="search" />
        </button>
        <ResultSearch
          data={watch("valueSearch")}
          resultRef={searchResultRef}
          searchRef={searchFormRef}
        />
      </form>
    </FormProvider>
  );
};

export default FormSearch;
