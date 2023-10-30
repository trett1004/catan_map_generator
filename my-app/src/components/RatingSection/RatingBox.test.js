import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { RatingBox } from "./RatingBox";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
const flatingBox = require("./RatingBox");
const mockFunc = jest.fn((x) => 42 + x);

describe("Component RatingBox", () => {
  test("renders", () => {
    render(<RatingBox />);
  });

  test('"Please rate the map" renders', () => {
    render(<RatingBox />);
    const callToAction = screen.getByText(/please rate the map/i);
    expect(callToAction).toBeInTheDocument();
  });
  test("rating stars render", () => {
    render(<RatingBox />);
    const ratingStars = screen.getByTestId("ratingStars");
    expect(ratingStars).toBeInTheDocument();
  });
  test("flickr preventer renders", () => {
    render(<RatingBox />);
    const flickerPreventer = screen.getByTestId("flickerPreventer");
    expect(flickerPreventer).toBeInTheDocument();
  });
  test("does not render green alert by default", () => {
    render(<RatingBox />);
    const greenAlertElement = screen.queryByText("Rating received");
    expect(greenAlertElement).toBeNull();
  });
});
