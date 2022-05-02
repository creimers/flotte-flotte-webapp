import { customRender } from "lib/test-utils";

import Page from "pages/reset-password";

test("renders without breaking", () => {
  customRender(<Page />);
});
