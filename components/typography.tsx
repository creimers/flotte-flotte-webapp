import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function H1({ children }: Props) {
  return <h1>{children}</h1>;
}
