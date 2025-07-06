"use client"
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Tcontroller = {
    name: string;
    label: string;
    type?: string;
    size?: "small" | 'medium';
    fullWidth?: boolean;
    required?: boolean;
    value?: string | number;
}

const ReUseInput = ({ name, type = 'text', size = 'small', fullWidth = true, label, required }: Tcontroller) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    variant="outlined"
                    size={size}
                    value={field.value || ''} // Ensure value is always a string
                    fullWidth={fullWidth}
                    required={required}
                    error={!!error?.message}
                    helperText={error?.message}
                />
            )}
        />
    )
}

export default ReUseInput;
