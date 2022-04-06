import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark 组件正确高亮关键词", () => {
  const name = "物料管理";
  const keyword = "管理";

  render(<Mark name={name} keyword={keyword} />);

  // 即查找这个 span 是否在这个document里面
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: blue");
});
