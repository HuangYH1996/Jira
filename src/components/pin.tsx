import { Rate } from "antd";
import React from "react";

// onChecked 为什么是可选的 因为作为title时 不需要响应change事件
interface pinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (param: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: pinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value: number) => {
        onCheckedChange?.(!!value);
      }}
      {...restProps}
    />
  );
};
