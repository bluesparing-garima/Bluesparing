import React from "react";
import { TextField, Grid } from "@mui/material";
import { Field } from "react-final-form";

interface DynamicTextFieldProps {
  name: string;
  label: string;
  rows?: number;
  type?:string|number;
  multiline?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  gridProps?: {
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
  };
}

const DynamicTextField: React.FC<DynamicTextFieldProps> = ({
  name,
  label,
  rows = 1,
  multiline = false,
  size = "small",
  variant = "outlined",
  type="text",
  gridProps = { lg: 12, md: 12, sm: 12, xs: 12 },
}) => {
  return (
    <Grid item {...gridProps}>
      <Field name={name}>
        {({ input, meta }: any) => (
          <TextField
            {...input}
            id={name}
            size={size}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            fullWidth
            label={label}
            variant={variant}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </Field>
    </Grid>
  );
};

export default DynamicTextField;
