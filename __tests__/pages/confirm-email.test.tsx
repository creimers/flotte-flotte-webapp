import { customRender } from "lib/test-utils";

import Page from "pages/confirm-email";

test("renders without breaking", () => {
  customRender(<Page />);
});
