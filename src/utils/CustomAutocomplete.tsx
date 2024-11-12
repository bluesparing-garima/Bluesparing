import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { FieldRenderProps } from "react-final-form";
export interface OptionType {
  label: string;
  value: string;
}
interface AutocompleteProps extends FieldRenderProps<OptionType, HTMLElement> {
  options: OptionType[];
  label: string;
}
const CustomAutocomplete: React.FC<AutocompleteProps> = ({
  input,
  meta,
  options,
  label,
  ...rest
}) => {
  const showError = meta.touched && meta.error;
  return (
    <Autocomplete
      {...rest}
      options={options}
      getOptionLabel={(option) => option.label}
      value={input.value || null}
      onChange={(event, selectedData) => {
        input.onChange(selectedData);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className="rounded-sm w-full"
          size="small"
          variant="outlined"
          error={showError}
          helperText={showError ? meta.error : ""}
        />
      )}
    />
  );
};
export default CustomAutocomplete;
