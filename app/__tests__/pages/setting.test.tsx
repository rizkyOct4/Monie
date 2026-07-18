import SettingPage from "@/app/(pages)/setting/page";
import { render } from "@testing-library/react";

describe("Setting page", () => {
  it("render Setting page", () => {
    const settingPage = render(<SettingPage />);
    expect(settingPage).toMatchSnapshot();
  });
});
