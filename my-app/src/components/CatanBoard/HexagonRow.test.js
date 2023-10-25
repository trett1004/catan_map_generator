import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HexagonRow from "./HexagonRow";
import {
  portsArr,
  landfieldsArr,
  fieldNumbersArr,
} from "../../helpers/create_board";

describe("Component HexagonRow ", () => {
  ////////////////////// First Row //////////////////////
  test("First row renders correctly (only water fields)", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={0}
        portIdxEnd={4}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="hexagonRow fourWaters"
      />
    );
    //Assert
    // outer Div class that renders the number of hexagons
    // const componentFirstChild = screen.query
    const { container } = render(
      <HexagonRow
        ports={portsArr}
        portIdx={0}
        portIdxEnd={4}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="hexagonRow fourWaters"
      />
    );

    const firstChild = container.getElementsByClassName("hexagonRow");
    expect(firstChild.length).toBe(1);
    const fieldAmount = container.getElementsByClassName("fourWaters");
    expect(fieldAmount.length).toBe(1);

    // Waterfield on left side
    const waterFieldOnLeftSide = container.getElementsByClassName(
      "water-hexagon-on-left"
    );
    expect(waterFieldOnLeftSide.length).toBe(0);

    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toBeNull();

    const hexagonFieldsRotation = screen.queryAllByTestId(
      "hexagon-water-field-port-rotation"
    );
    // is port rotation correct?
    expect(hexagonFieldsRotation[0]).toHaveClass("port3to1");
    expect(hexagonFieldsRotation[0]).toHaveClass("portRotation60Deg ");
    expect(hexagonFieldsRotation[2]).toHaveClass("weatPort");
    expect(hexagonFieldsRotation[2]).toHaveClass("portRotation60Deg ");

    // are the writings for ports hidden (writings of numbers should be displayed, ports not?
    const hexagonFieldsWaterWriting = screen.queryAllByTestId(
      "hexagon-water-writing"
    );
    // 4 fields are iterated
    hexagonFieldsWaterWriting.forEach((el) => {
      expect(el).toHaveClass("hidden");
    });
  });

  ////////////////////// Second Row //////////////////////
  test("Second row renders correctly", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={4}
        portIdxEnd={5}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={0}
        arrayEnd={3}
        idxAdder={0}
        className="hexagonRow three"
      />
    );

    //Assert
    // Left water field of the row
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toHaveClass("water");
    const waterHiddenWritingLeft = screen.queryByTestId(
      "hexagon-water-left-writing"
    );
    expect(waterHiddenWritingLeft).toHaveClass("hidden");

    // 3 Landfields in the middle of the row
    const landFields = screen.queryAllByTestId("hexagon-land-field");
    const landFieldsItems = landfieldsArr.slice(0, 3);
    landFields.forEach((el, idx) => {
      expect(el).toHaveClass(landFieldsItems[idx]);
    });
    const numbersClasses = screen.getAllByTestId("numbers");
    numbersClasses.forEach((el) => expect(el).toHaveClass("hexagonBg"));

    const two = screen.queryAllByText("2");
    expect(two[0]).toBeInTheDocument();
    const three = screen.queryAllByText("3");
    expect(three[0]).toBeInTheDocument();
    expect(three[1]).toBeInTheDocument();

    // Right water field of the row
    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toHaveClass("stonePort");
    expect(waterFieldOnRightSide).toHaveClass("portRotation180Deg");
    const waterHiddenWritingRight = screen.queryByTestId(
      "hexagon-water-right-writing"
    );
    expect(waterHiddenWritingRight).toHaveClass("hidden");
  });
  ////////////////////// Third Row //////////////////////
  test("Third row renders correctly", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={6}
        portIdxEnd={7}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={3}
        arrayEnd={7}
        idxAdder={3}
        className="hexagonRow four"
      />
    );
    // Left water field of the row
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toHaveClass("port3to1");
    const waterHiddenWritingLeft = screen.queryByTestId(
      "hexagon-water-left-writing"
    );
    expect(waterHiddenWritingLeft).toHaveClass("hidden");

    // 4 Landfields in the middle of the row
    const landFields = screen.queryAllByTestId("hexagon-land-field");
    const landFieldsItems = landfieldsArr.slice(3, 7);
    landFields.forEach((el, idx) => {
      expect(el).toHaveClass(landFieldsItems[idx]);

      const numbersClasses = screen.getAllByTestId("numbers");
      numbersClasses.forEach((el) => expect(el).toHaveClass("hexagonBg"));
    });
    const four = screen.queryAllByText("4");
    expect(four[0]).toBeInTheDocument();
    expect(four[1]).toBeInTheDocument();
    const five = screen.queryAllByText("5");
    expect(five[0]).toBeInTheDocument();
    expect(five[1]).toBeInTheDocument();

    // Right water field of the row
    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toHaveClass("water");
    const waterHiddenWritingRight = screen.queryByTestId(
      "hexagon-water-right-writing"
    );
    expect(waterHiddenWritingRight).toHaveClass("hidden");
  });
  ////////////////////// Fourth Row //////////////////////
  test("Fourth row renders correctly", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={8}
        portIdxEnd={9}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={7}
        arrayEnd={12}
        idxAdder={7}
        className="hexagonRow"
      />
    );
    // Left water field of the row
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toHaveClass("water");
    const waterHiddenWritingLeft = screen.queryByTestId(
      "hexagon-water-left-writing"
    );
    expect(waterHiddenWritingLeft).toHaveClass("hidden");

    // 4 Landfields in the middle of the row
    const landFields = screen.queryAllByTestId("hexagon-land-field");
    const landFieldsItems = landfieldsArr.slice(7, 12);
    landFields.forEach((el, idx) => {
      expect(el).toHaveClass(landFieldsItems[idx]);
    });

    // test if all classes are there
    const numbersClasses = screen.getAllByTestId("numbers");
    numbersClasses.forEach((el) => {
      expect(el).toHaveClass("hexagonBg");
      if (el === 6 || el === 8) expect(el).toHaveClass("redNumber");
    });

    // test if all numbers are correct
    const six = screen.queryAllByText("6");
    expect(six[0]).toBeInTheDocument();
    expect(six[1]).toBeInTheDocument();
    const eight = screen.queryAllByText("8");
    expect(eight[0]).toBeInTheDocument();
    expect(eight[1]).toBeInTheDocument();
    const nine = screen.queryAllByText("9");
    expect(nine[0]).toBeInTheDocument();

    // Right water field of the row
    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toHaveClass("port3to1");
    expect(waterFieldOnRightSide).toHaveClass("portRotation180Deg");
    const waterHiddenWritingRight = screen.queryByTestId(
      "hexagon-water-right-writing"
    );
    expect(waterHiddenWritingRight).toHaveClass("hidden");
  });

  ////////////////////// Fifth Row //////////////////////
  test("Fifth row renders correctly", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={10}
        portIdxEnd={11}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={12}
        arrayEnd={16}
        idxAdder={12}
        className="hexagonRow four"
      />
    );
    // Left water field of the row
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toBeInTheDocument();
    expect(waterFieldOnLeftSide).toHaveClass("clayPort");
    const waterHiddenwritingLeft = screen.getByTestId(
      "hexagon-water-left-writing"
    );
    expect(waterHiddenwritingLeft).toBeInTheDocument();
    expect(waterHiddenwritingLeft).toHaveClass("hidden");

    // Landfields in the middle of fith row
    const arrayStart = 12;
    const landFields = screen.getAllByTestId("hexagon-land-field");
    // console.log("landFields", landFields);
    landFields.forEach((el, idx) => {
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass(landfieldsArr[arrayStart + idx]);
    });
    // Right water field of the row
    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toBeInTheDocument();
    expect(waterFieldOnRightSide).toHaveClass("water");
    const waterHiddenWritingRight = screen.queryByTestId(
      "hexagon-water-right-writing"
    );
    expect(waterHiddenWritingRight).toHaveClass("hidden");
  });
  ////////////////////// Sixth Row //////////////////////
  test("Sixth row renders correctly", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={12}
        portIdxEnd={13}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={16}
        arrayEnd={19}
        idxAdder={16}
        className="hexagonRow three"
      />
    );
    // Left water field of the row
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toBeInTheDocument();
    expect(waterFieldOnLeftSide).toHaveClass("water");
    const waterHiddenwritingLeft = screen.getByTestId(
      "hexagon-water-left-writing"
    );
    expect(waterHiddenwritingLeft).toBeInTheDocument();
    expect(waterHiddenwritingLeft).toHaveClass("hidden");

    // Landfields in the middle of fith row
    const arrayStart = 16;
    const landFields = screen.getAllByTestId("hexagon-land-field");
    // console.log("landFields", landFields);
    landFields.forEach((el, idx) => {
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass(landfieldsArr[arrayStart + idx]);
    });
    // Right water field of the row
    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toBeInTheDocument();
    expect(waterFieldOnRightSide).toHaveClass("sheepPort");
    const waterHiddenWritingRight = screen.queryByTestId(
      "hexagon-water-right-writing"
    );
    expect(waterHiddenWritingRight).toHaveClass("hidden");
  });

  ////////////////////// Seventh Row //////////////////////
  test("Seventh row renders correctly (only water fields)", () => {
    render(
      <HexagonRow
        ports={portsArr}
        portIdx={14}
        portIdxEnd={18}
        landfields={landfieldsArr}
        numbers={fieldNumbersArr}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="hexagonRow fourWaters"
      />
    );
    // Only Waterfields in this row
    // Assert
    const waterFieldOnLeftSide = screen.queryByTestId("water-hexagon-on-left");
    expect(waterFieldOnLeftSide).toBeNull();

    const waterFieldOnRightSide = screen.queryByTestId(
      "water-hexagon-on-right"
    );
    expect(waterFieldOnRightSide).toBeNull();

    const hexagonFieldsRotation = screen.queryAllByTestId(
      "hexagon-water-field-port-rotation"
    );
    // is port rotation correct?
    expect(hexagonFieldsRotation[0]).toHaveClass("port3to1");
    expect(hexagonFieldsRotation[0]).toHaveClass("portRotation200Deg ");
    expect(hexagonFieldsRotation[2]).toHaveClass("woodPort");
    expect(hexagonFieldsRotation[2]).toHaveClass("portRotation200Deg ");

    // are the writings for ports hidden (writings of numbers should be displayed, ports not?
    const hexagonFieldsWaterWriting = screen.queryAllByTestId(
      "hexagon-water-writing"
    );
    // 4 fields are iterated
    hexagonFieldsWaterWriting.forEach((el) => {
      expect(el).toHaveClass("hidden");
    });
  });
});
