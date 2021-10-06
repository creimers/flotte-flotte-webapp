import * as React from "react";

import { classNames } from "@lib/utils";

import Footer from "@components/Footer";
import Header from "@components/Header";

type Props = {
  fullWidth?: boolean;
};

const DefaultLayout: React.FC<Props> = ({ children, fullWidth = false }) => {
  const defaultWrapperClassNames = "min-h-screen flex flex-col";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* <div className="max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8"> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
