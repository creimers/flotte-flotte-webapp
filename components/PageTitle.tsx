import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description?: string;
};

export default function PageTitle({ title, description }: Props) {
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
      <div className="prose my-3">
        <h1>{title}</h1>
      </div>
    </>
  );
}
