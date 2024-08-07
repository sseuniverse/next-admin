import { FieldProps } from "@rjsf/utils";
import MultiSelectWidget from "./MultiSelect/MultiSelectWidget";
import React from "react";

const ArrayField = (props: FieldProps) => {
  const { formData, onChange, name, disabled, schema, required } = props;
  return (
    <MultiSelectWidget
      onChange={onChange}
      formData={formData}
      name={name}
      // @ts-expect-error
      disabled={disabled}
      required={required}
      schema={schema}
    />
  );
};

export default ArrayField;
