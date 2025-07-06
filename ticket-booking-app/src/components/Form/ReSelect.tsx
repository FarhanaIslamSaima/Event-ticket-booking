import { MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Tcontroller = {
    name: string;
    label: string;
    type?: string;
    size?: "small" | 'medium';
    fullWidth?: boolean;
    required?: boolean;
     options: {
        name: string;
        id: string | number;
    }[];
}

const ReUseSelect = ({ name, type = 'text', size = 'small', fullWidth = true, label, required, options }: Tcontroller) => {
    const { control, formState } = useFormContext()
    const isError = formState.errors[name] !== undefined;
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
                    fullWidth={fullWidth}
                    required={required}
                    error={isError}
                    helperText={isError ? (formState.errors[name]?.message as string) : ''}
                    select
                >
                    {
                        options.map(data => (
                            <MenuItem key={data.id} value={data.id}>
                                <p>{data.name}</p>
                            </MenuItem>
                        ))
                    }
                </TextField>
            )}
        />
    )
}

export default ReUseSelect;