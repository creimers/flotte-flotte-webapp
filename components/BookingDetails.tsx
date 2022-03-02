import {
  TicketIcon,
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

import { BookingFragment, useCancelBookingMutation } from "@generated/graphql";

type Props = {
  booking: BookingFragment;
};
export default function BookingDetails({ booking }: Props) {
  const [cancelBooking, { loading }] = useCancelBookingMutation({
    variables: { bookingUuid: booking.uuid },
  });
  return (
    <div className="text-gray-700 space-y-4">
      <div className="font-semibold border-b border-gray-600 inline-block">
        Buchungs-Code
      </div>
      <div className="font-mono flex space-x-4 items-center">
        <TicketIcon className="w-5 h-5 stroke-current" />
        <span>{booking.token}</span>
      </div>
      <div className="font-semibold border-b border-gray-600 inline-block">
        Datum &amp; Abohlzeit
      </div>
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
      </div>
      <div className="font-semibold border-b border-gray-600 inline-block">
        Abhol-Station
      </div>
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
    </div>
  );
}
