import React from "react";
import { Field } from "react-final-form";
import { Autocomplete, FormControl, TextField } from "@mui/material";

interface Props {
    name: string;
    label: string;
    options: string[];
    onChangeExtra?: (value: string) => void;
}

const FormAutocompleteField: React.FC<Props> = ({
    name,
    label,
    options,
    onChangeExtra,
}) => {
    return (
        <Field name={name}>
            {({ input, meta }) => (
                <FormControl fullWidth size="small">
                    <Autocomplete
                        id={name}
                        value={input.value || null}
                        options={options}
                        onChange={(_, newValue) => {
                            input.onChange(newValue || "");
                            if (onChangeExtra) onChangeExtra(newValue || "");
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                size="small"
                                variant="outlined"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    />
                </FormControl>
            )}
        </Field>
    );
};

export default FormAutocompleteField;
