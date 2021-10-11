import * as React from "react";
import { NextSeo } from "next-seo";

import { classNames } from "@lib/utils";

import Footer from "@components/Footer";
import Header from "@components/Header";

type Props = {
  fullWidth?: boolean;
  title?: string;
  description?: string;
};

const DefaultLayout: React.FC<Props> = ({
  children,
  fullWidth = false,
  description,
  title,
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
        <div
          className={classNames(
            fullWidth ? "" : "max-w-4xl w-full mx-auto px-2 sm:px-6 lg:px-8",
            "mt-4"
          )}
        >
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
