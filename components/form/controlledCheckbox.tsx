import * as React from "react";
import { Controller } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";
import { CSS } from "stitches.config";
import { Checkbox, CheckboxIndicator, Flex, Label } from "../ui";

type ControlledCheckboxProps = {
  control: any;
  id: string;
  name: string;
  labelText: string;
  css?: CSS;
};

const ControlledCheckbox = ({
  control,
  id,
  name,
  labelText,
  ...other
}: ControlledCheckboxProps) => {
  return (
    <Flex css={{ alignItems: "center" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={id}
            value={field.value}
            checked={field.value}
            onCheckedChange={checked => field.onChange(checked)}
            ref={field.ref}
            {...other}
          >
            <CheckboxIndicator>
              <IoCheckmark />
            </CheckboxIndicator>
          </Checkbox>
        )}
      ></Controller>
      <Label textTransform="uppercase" htmlFor={id} size="1" css={{ paddingLeft: "$3" }}>
        {labelText}
      </Label>
    </Flex>
  );
};

export default ControlledCheckbox;
