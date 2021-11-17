import Spinner from "components/Spinner";

type Props = {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: JSX.Element;
};
export default function Button({
  text,
  disabled = false,
  loading = false,
  onClick,
  icon,
  type = "button",
}: Props) {
  return (
    <button
      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 relative"
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
