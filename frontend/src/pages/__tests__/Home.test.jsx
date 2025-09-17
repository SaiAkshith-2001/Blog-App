import { screen } from "@testing-library/react";
import { rendererWithRouter } from "../../utils/test-utils";
import Home from "../Home";
import About from "../About";
import NotFound from "../NotFound";

it("should render landing page", () => {
  rendererWithRouter(<Home />);
  const headingElement = screen.getByText(/Welcome to the Blog Application/i);
  expect(headingElement).toBeInTheDocument();
});

it("should render about page", () => {
  rendererWithRouter(<About />);
  const headingElement = screen.getByText(/About Our Blog/i);
  expect(headingElement).toBeInTheDocument();
});

it("should render Error page", () => {
  rendererWithRouter(<NotFound />);
  const headingElement = screen.getByText(/404 Uh-Oh../i);
  expect(headingElement).toBeInTheDocument();
});
