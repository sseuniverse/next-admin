"use client";

import { CustomInputProps } from "@sse-ui/neadmin";

type Props = CustomInputProps;

const InputDisplay = ({ value, name }: Props) => {
  return (
    <p className="text-sm" id={name}>
      {value}
    </p>
  );
};

export default InputDisplay;