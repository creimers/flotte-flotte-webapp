import {
  TicketIcon,
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  PhoneIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";

import { BookingFragment } from "generated/graphql";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

type Props = {
  booking: BookingFragment;
};

function Heading({ title }: { title: string }) {
  return (
    <h3 className="font-semibold border-b border-gray-600 inline-block">
      {title}
    </h3>
  );
}

type StatusItemProps = {
  name: string;
  active: boolean;
  activeColor: string;
  icon: JSX.Element;
};

function StatusItem({ name, active, activeColor, icon }: StatusItemProps) {
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

export default function BookingDetails({ booking }: Props) {
  return (
    <div className="text-gray-700 space-y-4">
      <Heading title="Status" />
      <div className="flex items-center space-x-4">
        {["REQUESTED", "CONFIRMED", "REJECTED", "CANCELED"].includes(
          booking.state,
        ) && (
          <StatusItem
            name="Gebucht"
            active={booking.state === "REQUESTED"}
            activeColor="text-green-500"
            icon={<CheckCircleIcon />}
          />
        )}
        {["REQUESTED", "CONFIRMED", "CANCELED"].includes(booking.state) && (
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
      <Heading title="Buchungs-Code" />
      <div className="font-mono flex space-x-4 items-center">
        <TicketIcon className="w-5 h-5 stroke-current" />
        <span>{booking.token}</span>
      </div>

      <Heading title="Lastenrad" />
      <div className="flex space-x-4 items-center">
        <ShieldCheckIcon className="w-5 h-5 stroke-current" />
        <span>{booking.bike.name}</span>
      </div>

      <Heading title="Datum &amp; Abohlzeit" />
      <div className="flex space-x-4 items-center">
        <CalendarIcon className="w-5 h-5 stroke-current" />
        <span>{new Date(booking.startDate).toLocaleDateString()}</span>
      </div>
      <div className="space-y-3">
        <div className="flex space-x-4 items-center">
          <ClockIcon className="w-5 h-5 stroke-current" />
          <span>{booking.pickupTimestamp}</span>
        </div>
        <div className="text-xs">
          (Du kannst den Este-Esel nach der Abholung den ganzen Tag lang
          nutzen!)
        </div>
        <div className="text-xs">
          Falls du es doch nicht schaffst oder dich verspätest: Bitte
          rechtzeitig bescheid sagen!
        </div>
      </div>
      <Heading title="Abhol-Station" />
      <div className="flex space-x-4 items-start">
        <LocationMarkerIcon className="w-5 h-5 stroke-current" />
        <div>
          <div className="flex items-center space-x-4">
            <div>
              <div>{booking.bike.pickupStation?.contactName}</div>
              <div>{booking.bike.pickupStation?.locationStreet}</div>
              <div>
                {booking.bike.pickupStation?.locationPostalcode}{" "}
                {booking.bike.pickupStation?.locationCity}
              </div>
            </div>
          </div>
          <div className="text-xs mt-2 underline">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://maps.google.com/?q=${booking.bike.pickupStation?.locationStreet},${booking.bike.pickupStation?.locationPostalcode},${booking.bike.pickupStation?.locationCity}`}
            >
              <span className="flex items-center space-x-2">
                <ExternalLinkIcon className="stroke-current w-3 h-3" />
                <span>Auf der Karte ansehen.</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      {booking.bike.pickupStation?.contactTelephone && (
        <div className="flex space-x-4 items-center">
          <PhoneIcon className="w-5 h-5 stroke-current" />
          <div>
            <a href={`tel:${booking.bike.pickupStation?.contactTelephone}`}>
              {booking.bike.pickupStation?.contactTelephone}
            </a>
          </div>
        </div>
      )}
      {booking.bike.pickupStation?.locationDescription && (
        <div className="flex space-x-4">
          <InformationCircleIcon className="w-5 h-5 stroke-current flex-shrink-0" />
          <div className="prose">
            {booking.bike.pickupStation?.locationDescription}
          </div>
        </div>
      )}
    </div>
  );
}
