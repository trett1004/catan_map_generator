import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App"; // No need to import MainSection separately

describe("Application", () => {
  test("App renders correctly", () => {
    render(<App />);
    const heading = screen.getByText("Catan Map Gen");
    expect(heading).toBeInTheDocument();
  });
});
