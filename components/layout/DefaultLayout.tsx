import * as React from "react";
import { NextSeo } from "next-seo";

import Footer from "@components/Footer";
import Header from "@components/Header";
import ResendEmailVerificationAlert from "@components/ResendEmailVerificationAlert";

type Props = {
  fullWidth?: boolean;
  title?: string;
  description?: string;
  alerts?: JSX.Element[];
};

const DefaultLayout: React.FC<Props> = ({
  children,
  fullWidth = false,
  description,
  title,
  alerts,
}) => {
  const seoProps: { [key: string]: string } = {};
  if (title) {
    seoProps.title = `${title} | Este-Esel`;
  }
  if (description) {
    seoProps.description = description;
  }
  return (
    <>
      {(title || description) && <NextSeo {...seoProps} />}
      <div className="min-h-screen flex flex-col">
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
