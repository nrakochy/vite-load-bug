import { describe, test } from "vitest";
// import { render, screen } from "./test-utils";
import { render, renderHook, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import App from "../src/App";
import { RootState, createReduxStore, useAppSelector } from "../src/redux/store";
import ErrorBoundary from "../src/components/ErrorBoundary";

describe("App component", () => {
  /*
  TODO: Find out the reason of the following error:
  stderr | tests/App.test.tsx > App component > renders with Error
  Error: Uncaught [Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>]
  */

  test("renders correctly", () => {
    const store = createReduxStore();
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    render(component);
    const mainContainer = screen.getByRole("main");
    expect(mainContainer).toBeInTheDocument();
  });

  test("renders with Fallback", () => {
    const store = createReduxStore();
    const component = (
      <ErrorBoundary>
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      </ErrorBoundary>
    );

    render(component);
    const errorElement = screen.getByRole("heading");
    expect(errorElement).toBeInTheDocument();
  });
});

describe("Selector hook", () => {
  /*
  TODO: Find out the reason of the following error:
  stderr | tests/App.test.tsx > App component > renders with Error
  Error: Uncaught [Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>]
  */

  test("renders selectors as expected", () => {
    const store = createReduxStore({ courseDetails: true });
    const wrapper = () => (
      <Provider store={store}>
        <MemoryRouter />
      </Provider>
    );

    const selectExample = (state: RootState) => state.courseDetails;

    const { result } = renderHook(() => useAppSelector(selectExample), {
      wrapper,
    });

    console.info("STORE", store.getState());
    expect(result.current).toBe(true);
  });
});
