import { rest } from "msw";
import { token } from "./data";
import { apiRouts } from "../../src/routes/apiRouts";

export const handlers = [
  rest.get(apiRouts.GET_TOKEN_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(token));
  }),
];
