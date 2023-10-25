import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CatanBoard from "./CatanBoard";
import {
  landfieldsArr,
  fieldNumbersArr,
  portsArr,
} from "../../helpers/create_board";

describe("Component CatanBoard", () => {
  test("Outer Div renders", () => {
    // const { container } = render(
    //   <CatanBoard landfields={landfieldsArr} numbers={fieldNumbersArr} />
    // );

    // // Is the outer div there?
    // const firstChild = container.children;
    // expect(firstChild.length).toBe(1);

    render(<CatanBoard landfields={landfieldsArr} numbers={fieldNumbersArr} />);

    const outerDiv = screen.getByTestId("wrapper");
    expect(outerDiv).toBeInTheDocument();
  });
  test("All hexagon rows render", () => {
    render(<CatanBoard landfields={landfieldsArr} numbers={fieldNumbersArr} />);
    const hexagonRows = screen.getAllByTestId("hexagonRow");
    expect(hexagonRows.length).toBe(7);
  });
});
