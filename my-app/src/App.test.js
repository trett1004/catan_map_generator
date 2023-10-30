import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App"; // No need to import MainSection separately
import { landfieldsArr, fieldNumbersArr } from "./helpers/create_board";

describe("App Integration Test", () => {
  test("has 19 landfields", () => {
    render(<App />);
    const landfields = screen.getAllByTestId("hexagon-land-field");
    expect(landfields.length).toBe(19);
  });
  test("Shuffels the landfields correctly", () => {
    render(<App />);
    const shuffleBtn = screen.getByText(/SHUFFLE THE FIELDS/i);
    expect(shuffleBtn).toBeInTheDocument();
    fireEvent.click(shuffleBtn);

    const shuffledLandfields = screen.getAllByTestId("hexagon-land-field");
    expect(shuffledLandfields[18]).not.toHaveClass("desert");
    const newLandfieldArrBgImg = shuffledLandfields.map(
      (element, index) => element.className
    );
    expect(newLandfieldArrBgImg).not.toEqual(landfieldsArr);
    expect(newLandfieldArrBgImg.length).toEqual(19);

    const newLandfieldArrNumbers = shuffledLandfields.map((element, index) =>
      parseInt(element.textContent)
    );
    expect(newLandfieldArrNumbers).not.toEqual(fieldNumbersArr);
    expect(newLandfieldArrNumbers.length).toEqual(19);
  });
  test("Renders the shuffled map name correctly", () => {
    render(<App />);
    const shuffleBtn = screen.getByText(/SHUFFLE THE FIELDS/i);
    expect(shuffleBtn).toBeInTheDocument();
    fireEvent.click(shuffleBtn);
    const mapName = screen.getByText(/map:.+/i);
    expect(mapName.textContent).not.toEqual("Map:");
  });
});
