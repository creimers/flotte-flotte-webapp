import Stats from "./index";

import { customRender as render, waitFor, screen } from "lib/test-utils-msw";

test("renders without breaking", async () => {
  render(<Stats />);
  const bookings = await waitFor(() => screen.getByText(/buchungen/i));
  expect(bookings).toBeDefined();
  const emissions = await waitFor(() => screen.getByText(/kg co/i));
  expect(emissions).toBeDefined();
});
