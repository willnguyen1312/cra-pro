import { act, render, screen } from "@testing-library/react";
import React from "react";

const Playground = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 2000);
  }, []);

  return (
    <div>{count === 0 ? <p>Value: {count}</p> : <h1>Value: {count}</h1>}</div>
  );
};

describe("Playground with rtl", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render correctly", async () => {
    render(<Playground />);

    act(() => jest.runAllTimers());

    screen.getByText("Value: 1");
  });
});
