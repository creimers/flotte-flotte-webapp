import { customRender } from "lib/test-utils";

import Page from "pages/login";

test("renders without breaking", () => {
  customRender(<Page />);
});
