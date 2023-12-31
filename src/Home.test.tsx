import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { PolarisTestProvider } from "@shopify/polaris";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { HttpResponse, graphql } from "msw";
import { beforeEach } from "node:test";
import { Home } from "./Home";
import { server } from "./mocks/node";

const link = new HttpLink({
  uri: "http://localhost:5173/graphql",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function renderApp() {
  render(
    <ApolloProvider client={client}>
      <PolarisTestProvider>
        <Home />
      </PolarisTestProvider>
    </ApolloProvider>
  );
}

beforeEach(() => {
  server.resetHandlers();
});

test("Home component should render successfully on error case", async () => {
  server.use(
    graphql.query("ListMovies", () => {
      return HttpResponse.json({
        errors: [
          {
            message: `Cannot succeed!`,
          },
        ],
      });
    })
  );

  renderApp();

  // Wait for the loading indicator to disappear
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  expect(screen.getByText("Error: Cannot succeed!")).toBeInTheDocument();
});

test("Home component should render successfully on happy case", async () => {
  renderApp();

  const user = userEvent.setup();
  //   Wait for the loading indicator to disappear
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  expect(screen.getByText("The Matrix")).toBeInTheDocument();

  expect(screen.getAllByRole("listitem").length).toBe(3);

  const addNewMovieButton = screen.getByRole("button", { name: "Add Movie" });
  await user.click(addNewMovieButton);

  await screen.findByText("Total count: 4");
});
