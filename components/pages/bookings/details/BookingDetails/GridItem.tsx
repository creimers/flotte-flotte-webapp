import { classNames } from "lib/utils";
type Props = {
  title: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  children?: React.ReactNode;
};
export default function GridItem({
  title,
  colSpan = "col-span-1",
  children,
}: Props) {
  return (
    <div className={classNames(colSpan, "bg-gray-100 rounded-xl p-6")}>
      <div className="mb-3 text-sm font-medium text-gray-600 underline">
        {title}
      </div>
      <div className="text-lg">{children}</div>
    </div>
  );
}
