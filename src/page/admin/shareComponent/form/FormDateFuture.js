import { DatePicker } from "antd";
import { Icon } from "assets/icon";
import React from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";

const FormDateFuture = ({
  label,
  control,
  name,
  disable,
  type,
  required,
  errors,
  onChange,
  inputProps,
  disabled,
  max,
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
          console.log("value", value);
          return (
            <DatePicker
              className="w-full"
              disabled={disabled}
              disabledDate={(d) =>
                !d ||
                dayjs(d).isBefore(dayjs(), "day") ||
                d.isAfter(dayjs(max).add(120, "day"), "day")
              }
              //!d kiểm tra xem ngày d có tồn tại hay không.
              //dayjs(d).isBefore(dayjs(), 'day') kiểm tra xem ngày d có trước ngày hiện tại hay không.
              //d.isAfter(dayjs(max).add(7, 'day'), 'day') kiểm tra xem ngày d có sau max + 7 ngày hay không.
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

export default FormDateFuture;

// const FormDatePicker = ({
//   label,
//   control,
//   name,
//   disabled,
//   type,
//   required,
//   errors,
//   onChange,
//   inputProps,
//   max,
// }) => {
//   return (
//     <div className="flex flex-col items-start w-full">
//       <h5 className="mb-[5px]">
//         {label} {required && <span className="text-[red]">*</span>}
//       </h5>
//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { onChange, onBlur, value, ref } }) => {
//           return (
//             <DatePicker
//               disabledDate={(d) => !d || d.isAfter(moment().add(1))}
//               value={
//                 value &&
//                 dayjs(new Date(value).toLocaleDateString("en-GB"), "DD-MM-YYYY")
//               }
//               onChange={(data) => onChange(data?.$d)}
//               onBlur={onBlur}
//               {...inputProps}
//             />
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default FormDatePicker;
