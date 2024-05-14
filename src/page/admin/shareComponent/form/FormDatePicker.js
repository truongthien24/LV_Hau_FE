import { DatePicker } from "antd";
import { Icon } from "assets/icon";
import React from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";

const FormDatePicker = ({
  label,
  control,
  name,
  disabled,
  type,
  required,
  errors,
  onChange,
  inputProps,
  max,
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <h5 className="mb-[5px]">
        {label} {required && <span className="text-[red]">*</span>}
      </h5>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <DatePicker
              className="w-full"
              disabled={disabled}
              // disabledDate={(d) => !d || d.isAfter(max + 1)}
              disabledDate={(d) => !d || d.isAfter(moment().add(1))}
              //moment().add(1, 'day'): Thêm 1 ngày vào ngày hiện tại để có giá trị max.
              value={
                value &&
                dayjs(new Date(value).toLocaleDateString("en-GB"), "DD-MM-YYYY")
              }
              onChange={(data) => onChange(data?.$d)}
              onBlur={onBlur}
              {...inputProps}
            />
          );
        }}
      />
    </div>
  );
};

export default FormDatePicker;
