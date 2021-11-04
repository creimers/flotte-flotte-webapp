import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

type Props = {
  type: "success" | "error" | "warning" | "info";
  text: string | JSX.Element;
};

const iconMapping = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationIcon,
};

const backgroundColorMapping = {
  success: "bg-green-50",
  error: "bg-red-50",
  info: "bg-blue-50",
  warning: "bg-yellow-50",
};

const iconColorMapping = {
  success: "text-green-400",
  error: "text-red-400",
  info: "text-blue-400",
  warning: "text-yellow-400",
};

const textColorMapping = {
  success: "text-green-800",
  error: "text-red-800",
  info: "text-blue-800",
  warning: "text-yellow-800",
};

export default function Alert({ type, text }: Props) {
  const Icon = iconMapping[type];
  const iconColor = iconColorMapping[type];
  const backgroundColor = backgroundColorMapping[type];
  const textColor = textColorMapping[type];
  return (
    <div className={`rounded-md ${backgroundColor} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className={`text-sm font-medium ${textColor}`}>{text}</div>
        </div>
      </div>
    </div>
  );
}
