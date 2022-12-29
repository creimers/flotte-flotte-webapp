import {
  TicketIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import { BookingFragment } from "generated/graphql";
import GridItem from "./GridItem";
import Status from "./Status";

type Props = {
  booking: BookingFragment;
};

export default function BookingDetails({ booking }: Props) {
  if (!booking) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <GridItem title="Lastenrad">{booking.bike?.name}</GridItem>
        <GridItem title="Status">
          <Status booking={booking} />
        </GridItem>
        <GridItem title="Buchungs-Code">
          <div className="font-mono flex space-x-4 items-center">
            <TicketIcon className="w-5 h-5 stroke-current" />
            <span>{booking.token}</span>
          </div>
        </GridItem>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GridItem title="Abholung">
          <div className="flex space-x-4 items-center">
            <CalendarIcon className="w-5 h-5 stroke-current" />
            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <ClockIcon className="w-5 h-5 stroke-current" />
            <span>{booking.pickupTimestamp}</span>
          </div>
          <div className="h-4" />
          <div className="text-xs">
            Falls du es doch nicht schaffst oder dich verspätest: Bitte
            rechtzeitig bescheid sagen!
          </div>
        </GridItem>

        <GridItem title="Rückgabe">
          <div className="flex space-x-4 items-center">
            <CalendarIcon className="w-5 h-5 stroke-current" />
            <span>{new Date(booking.returnDate).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <ClockIcon className="w-5 h-5 stroke-current" />
            <span>{booking.returnTimestamp || "-"}</span>
          </div>
        </GridItem>

        <GridItem title="Verleih-Station">
          <div className="space-y-2">
            {booking?.bike && (
              <div className="flex space-x-4 items-start">
                <MapPinIcon className="w-5 h-5 stroke-current" />
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
              </div>
            )}

            {booking?.bike && booking.bike.pickupStation?.contactTelephone && (
              <div className="flex space-x-4 items-center">
                <PhoneIcon className="w-5 h-5 stroke-current" />
                <div>
                  <a
                    href={`tel:${booking.bike.pickupStation?.contactTelephone}`}
                  >
                    {booking.bike.pickupStation?.contactTelephone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </GridItem>

        <GridItem title="Stations-Info">
          {booking?.bike && booking.bike.pickupStation?.locationDescription ? (
            <div className="prose">
              {booking.bike.pickupStation?.locationDescription}
            </div>
          ) : (
            "-"
          )}
        </GridItem>
      </div>
    </div>
  );
}
