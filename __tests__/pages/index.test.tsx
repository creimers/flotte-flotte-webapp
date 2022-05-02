import { customRender } from "lib/test-utils";

import Home from "pages/index";

test("renders without breaking", () => {
  customRender(<Home />);
});
