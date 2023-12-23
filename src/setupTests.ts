// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { destroyAll } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
import { server } from "./mocks/node";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  destroyAll();
});

afterAll(() => {
  server.close();
});
