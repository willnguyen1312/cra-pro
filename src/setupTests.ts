// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { destroyAll } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
import { server } from "./mocks/node";

import { TextDecoder, TextEncoder } from "node:util";

import { Blob, File } from "node:buffer";
import { FormData, Headers, Request, Response, fetch } from "undici";

// Polyfill for msw
// jest.polyfills.js
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

// Setup msw server

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
