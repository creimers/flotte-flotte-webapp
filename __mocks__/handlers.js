import { graphql } from "msw";

export const handlers = [
  graphql.query("StatsQuery", (_req, res, ctx) => {
    return res(
      ctx.data({ stats: { users: 12, kilometers: 12, bookings: 12 } })
    );
  }),
];
