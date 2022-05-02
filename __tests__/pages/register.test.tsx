import { customRender } from "lib/test-utils";

import Page from "pages/register";

test("renders without breaking", () => {
  customRender(<Page />);
});
