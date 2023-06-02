import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("should render correctly", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });
  });
});
