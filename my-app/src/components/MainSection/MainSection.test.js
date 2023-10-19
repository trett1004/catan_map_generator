import { landfieldsArr, fieldNumbersArr } from "../../helpers/create_board";
import MainSection from "./MainSection";
import { render, screen } from "@testing-library/react";

describe("MainSection", () => {
  test("MainSection renders", () => {
    render(<MainSection />);
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
