import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "../Banner";

describe("Banner", () => {
  let spyOnClose = jest.fn();
  const mockProps = {
    message: "banner for test",
    onClose: spyOnClose,
  };
  it("should render", async () => {
    const { queryByText, queryByLabelText } = render(<Banner {...mockProps} />);
    await screen.findByText("banner for test");
    expect(queryByText("banner for test")).toBeTruthy();
    expect(queryByLabelText("Close")).toBeTruthy();
  });

  it("should call onClose when click on x button", async () => {
    const { queryByLabelText } = await render(<Banner {...mockProps} />);
    const closeBtn = queryByLabelText("Close");
    if (closeBtn) fireEvent.click(closeBtn);
    expect(spyOnClose).toBeCalled();
  });
});
