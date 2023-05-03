import { describe, test } from "vitest";
import { rest } from "msw";
import { getToken } from "../../src/helpers/tokenHandler";
import { apiRouts } from "../../src/routes/apiRouts";
import { token as mockedToken } from "../mocks/data";
import { server } from "../mocks/server";

describe("TokenHandler helper", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const { signal } = new AbortController();

  test("return token", async () => {
    const token = await getToken(apiRouts.GET_TOKEN_URL, signal);
    console.log("token: ", token);

    expect(token).toEqual(mockedToken);
  });

  test("throws error", async () => {
    server.use(
      rest.get(apiRouts.GET_TOKEN_URL, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const error = await getToken(apiRouts.GET_TOKEN_URL, signal);
    console.log("error: ", error);

    expect(error).toBe("Request failed with status code 500");
  });
});
