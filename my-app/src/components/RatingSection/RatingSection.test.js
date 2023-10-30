import { render, screen } from "@testing-library/react";
import RatingSection from "./RatingSection";
import { act } from "react-dom/test-utils";

describe("RatingSection component", () => {
  test("renders table data from database", async () => {
    window.fetch = jest.fn();
    const tableData = [
      {
        _id: 1,
        fieldArray: [
          "wood",
          "wood",
          "wood",
          "wood",
          "weat",
          "weat",
          "weat",
          "weat",
          "sheep",
          "sheep",
          "sheep",
          "sheep",
          "stone",
          "stone",
          "stone",
          "clay",
          "clay",
          "clay",
          "desert",
        ],
        numberArray: [
          2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, -1,
        ],
        rating: [2.5, 5, 5, 4.5, 2.5, 2.5, 5, 5, 2.5],
        voteCount: 9,
        mapName: "eager_diffie",
      },
    ];
    window.fetch.mockResolvedValueOnce({
      json: async () => tableData,
    });
    await act(async () => {
      render(<RatingSection />);
    });

    // Assert
    const tableOfRatings = await screen.getAllByRole("row");
    expect(tableOfRatings.length).toEqual(1);
  });
});
