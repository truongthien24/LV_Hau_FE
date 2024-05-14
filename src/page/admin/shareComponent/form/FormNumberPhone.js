import { Input } from "antd";
import { Icon } from "assets/icon";
import React from "react";
import { Controller } from "react-hook-form";

const FormNumberPhone = ({
  label,
  control,
  name,
  disabled,
  type,
  required,
  errors,
  onChange,
  inputProps,
  minLength,
  maxLength,
}) => {
  return (
    <div className="flex flex-col items-start">
      <h5 className="mb-[5px]">
        {label} {required && <span className="text-[red]">*</span>}
      </h5>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <Input
              addonBefore="+84"
              placeholder={`Điền vào ${label}...`}
              className={`w-full outline-none border-[1px]border-solid border-[#b4b4b4] rounded-[5px] relative ${
                disabled && "border-[#b4b4b4] bg-[#cfcece]"
              } ${errors?.[name]?.message ? "border-orange-400" : ""}`}
              value={value}
              onChange={onChange}
              minLength={minLength}
              maxLength={maxLength}
              onBlur={onBlur}
              type={type}
              disabled={disabled}
              {...inputProps}
            />
            //   {errors?.[name] && (
            //     <div className="absolute right-2 md:right-1 top-[50%] translate-y-[-50%]">
            //       <span className="hover-span">
            //         <Icon color="#c80000" name="warning" />
            //       </span>
            //       <span className="absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden">
            //         {errors?.[name]?.message}
            //       </span>
            //     </div>
            //   )}
          );
        }}
      />
    </div>
  );
};

export default FormNumberPhone;
