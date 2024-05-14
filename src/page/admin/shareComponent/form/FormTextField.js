import { Icon } from "assets/icon";
import React from "react";
import { Controller } from "react-hook-form";

const FormTextField = ({
  label,
  control,
  name,
  disable,
  type,
  required,
  errors,
  onChange,
  inputProps,
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
            <div
              className={`border-[1px] w-full border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${
                disable && "border-[#b4b4b4] bg-[#cfcece]"
              } ${errors?.[name]?.message ? "border-orange-400" : ""}`}
            >
              <input
                placeholder={`Điền vào ${label}...`}
                className={`w-[92%] outline-none`}
                style={{backgroundColor: 'transparent'}}
                value={value}
                onChange={onChange}
                disabled={disable}
                onBlur={onBlur}
                {...inputProps}
                type={type}
              />
              {errors?.[name] && (
                <div className="absolute right-2 md:right-1 top-[50%] translate-y-[-50%]">
                  <span className="hover-span">
                    <Icon color="#c80000" name="warning" />
                  </span>
                  <span className="absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden">
                    {errors?.[name]?.message}
                  </span>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default FormTextField;
