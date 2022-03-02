import * as React from "react";

import Footer from "@components/Footer";
import Header from "@components/Header";
import ResendEmailVerificationAlert from "@components/ResendEmailVerificationAlert";

type Props = {
  fullWidth?: boolean;
  alerts?: JSX.Element[];
};

const DefaultLayout: React.FC<Props> = ({
  children,
  fullWidth = false,
  alerts,
}) => {
  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <div className="max-w-4xl w-full mx-auto px-2 sm:px-6 lg:px-8 mt-4">
          <div className="space-y-2">
            {alerts && alerts.map((a) => a)}
            <ResendEmailVerificationAlert />
          </div>
          {!fullWidth && children}
        </div>
        {fullWidth && <div className="">{children}</div>}
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
