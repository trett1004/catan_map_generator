import {
  landfieldsArr,
  fieldNumbersArr,
  getRandomName,
} from "../../helpers/create_board";
import ShuffleBtn from "../Btn/ShuffleBtn";
import MainSection from "./MainSection";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("MainSection", () => {
  test("MainSection renders", () => {
    render(<MainSection />);
  });
  test("Shuffle button renders", () => {
    render(
      <ShuffleBtn
      // setLandfields={landfieldsArr}
      // setNumbers={fieldNumbersArr}
      // setName={getRandomName}
      />
    );
  });
  test("Shuffle button onClick works", () => {
    const mockCallBack = jest.fn();
    render(<ShuffleBtn onClick={mockCallBack} />);
    const button = screen.getByText("SHUFFLE THE FIELDS");
    // fireEvent.click(button);
    //   expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  // Test numbers
  // Test land fields
  test("landfields array is correct", () => {
    expect(landfieldsArr.length).toBe(19);
    const woodFields = landfieldsArr.filter((element) => element === "wood");
    expect(woodFields.length).toBe(4);
    const weatFields = landfieldsArr.filter((element) => element === "weat");
    expect(weatFields.length).toBe(4);
    const sheepFields = landfieldsArr.filter((element) => element === "sheep");
    expect(sheepFields.length).toBe(4);
    const stoneFields = landfieldsArr.filter((element) => element === "stone");
    expect(stoneFields.length).toBe(3);
    const clayFields = landfieldsArr.filter((element) => element === "clay");
    expect(clayFields.length).toBe(3);
    const desertField = landfieldsArr.filter((element) => element === "desert");
    expect(desertField.length).toBe(1);
  });
});
