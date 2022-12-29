import Spinner from "components/Spinner";
import { classNames } from "lib/utils";

const emphasisClasses = {
  primary: "bg-teal-500 text-white hover:bg-teal-600 focus:ring-blue-500",
  negative: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  neutral: "bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-400",
};

type Props = {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: JSX.Element;
  emphasis?: "primary" | "negative" | "neutral";
};
export default function Button({
  text,
  disabled = false,
  loading = false,
  onClick,
  icon,
  type = "button",
  emphasis = "primary",
}: Props) {
  return (
    <button
      className={classNames(
        "w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 relative",
        emphasisClasses[emphasis],
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="w-5 h-5 text-white">
          <Spinner />
        </div>
      ) : (
        <span className="flex">
          {icon && <span className="mr-2">{icon}</span>} {text}
        </span>
      )}
    </button>
  );
}
