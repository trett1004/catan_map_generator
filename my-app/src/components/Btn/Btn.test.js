import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Btn from "./Btn";
import ShuffleBtn from "./ShuffleBtn";

describe("Component Btn", () => {
  test("Test click event", () => {
    const mockCallBack = jest.fn();
    const content = "SHUFFLE THE FIELDS";
    const { getByText } = render(
      <Btn content={content} onClick={mockCallBack} />
    );

    const button = getByText(content);

    fireEvent.click(button);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
  test("Button text ist correct", () => {
    const content = "SHUFFLE THE FIELDS";
    render(<Btn content={content} />);
    const buttonText = screen.getByText(/shuffle the fields/i);
    expect(buttonText).toBeInTheDocument();
  });
});
