import { Select } from "antd";
import { Icon } from "assets/icon";
import React from "react";
import { Controller } from "react-hook-form";

const FormSelect = ({
    label,
    control,
    name,
    disable,
    type,
    required,
    className,
    errors,
    onChangeForm,
    option,
    inputProps,
}) => {
    return (
        <div className={`flex flex-col items-start ${className} w-full`}>
            <h5 className="mb-[5px]">
                {label} {required && <span className="text-[red]">*</span>}
            </h5>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <Select
                            disabled={disable}
                            className="w-full"
                            options={option}
                            ref={ref}
                            value={value}
                            onChange={(e) => {
                                onChange(e);
                                onChangeForm && onChangeForm(e)
                            }}
                            onBlur={onBlur}
                            {...inputProps}
                        />
                    );
                }}
            />
        </div>
    );
};

export default FormSelect;
