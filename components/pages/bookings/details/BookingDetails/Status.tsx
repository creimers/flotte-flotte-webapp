import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { BookingFragment } from "generated/graphql";

type StatusItemProps = {
  name: string;
  active?: boolean;
  activeColor: string;
  icon: JSX.Element;
};

function StatusItem({
  name,
  active = false,
  activeColor,
  icon,
}: StatusItemProps) {
  return (
    <div className="inline-flex items-center space-x-1">
      <div className={`${active ? activeColor : "text-gray-400"} w-5 h-5`}>
        {icon}
      </div>
      <span className={`${active ? "text-gray-900" : "text-gray-500"}`}>
        {name}
      </span>
    </div>
  );
}

type Props = {
  booking: BookingFragment;
};
export default function Status({ booking }: Props) {
  return (
    <div className="flex items-center space-x-4">
      {booking.state === "REQUESTED" && (
        <StatusItem
          name="Angefragt"
          //   active={booking.state === "REQUESTED"}
          activeColor="text-green-500"
          icon={<CheckCircleIcon />}
        />
      )}
      {booking.state === "CONFIRMED" && (
        <StatusItem
          name="Bestätigt"
          active={booking.state === "CONFIRMED"}
          activeColor="text-green-500"
          icon={<CheckCircleIcon />}
        />
      )}
      {booking.state === "REJECTED" && (
        <StatusItem
          name="Abgelehnt"
          active
          activeColor="text-red-500"
          icon={<XCircleIcon />}
        />
      )}
      {booking.state === "CANCELED" && (
        <StatusItem
          name="Storniert"
          active
          activeColor="text-red-500"
          icon={<XCircleIcon />}
        />
      )}
    </div>
  );
}
