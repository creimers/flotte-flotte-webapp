import * as React from "react";
import { useRouter } from "next/router";

import { useAuth, AuthStatus } from "@context/auth";

import Alert from "@components/Alert";
import DefaultLayout from "@components/layout/DefaultLayout";

import { useBookingDetailsLazyQuery } from "@generated/graphql";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

export default function BookingDetail() {
  const { authState } = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const router = useRouter();
  const { uuid } = router.query;

  const [getBookingDetails, { data, loading, error }] =
    useBookingDetailsLazyQuery({ variables: { uuid: `${uuid}` } });

  React.useEffect(() => {
    if (window.location.search.includes("success")) {
      setShowSuccessAlert(true);
    }
  }, []);

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    } else if (authState === AuthStatus.authenticated) {
      getBookingDetails();
    }
  }, [authState, router, getBookingDetails]);

  return (
    <DefaultLayout>
      <div className="prose">
        <h1>Buchungs-Details</h1>
      </div>
      {showSuccessAlert && (
        <div className="my-2">
          <Alert text="Du hast den Este-Esel gebucht!" type="success" />
        </div>
      )}
      {data?.booking?.state === "REQUESTED" && (
        <div className="my-2">
          <Alert
            text="Bitte beachte, dass die Buchung noch bestätigt werden muss."
            type="info"
          />
        </div>
      )}
      {!loading && data?.booking === null && (
        <div className="my-2">
          <Alert
            text="Die Buchung konnte nicht gefunden werden."
            type="error"
          />
        </div>
      )}
      {data && data.booking && (
        <div className="text-gray-700 space-y-4">
          <div className="flex space-x-4 items-center">
            <CalendarIcon className="w-5 h-5 stroke-current" />
            <span>{new Date(data.booking.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <ClockIcon className="w-5 h-5 stroke-current" />
            <span>{data.booking.pickupTimestamp}</span>
          </div>
          <div className="flex space-x-4 items-start">
            <LocationMarkerIcon className="w-5 h-5 stroke-current" />
            <div>
              <div className="flex items-center space-x-4">
                <div>
                  <div>{data.booking.bike.pickupStation?.contactName}</div>
                  <div>{data.booking.bike.pickupStation?.locationStreet}</div>
                  <div>
                    {data.booking.bike.pickupStation?.locationPostalcode}{" "}
                    {data.booking.bike.pickupStation?.locationCity}
                  </div>
                </div>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://maps.google.com/?q=${data.booking.bike.pickupStation?.locationStreet},${data.booking.bike.pickupStation?.locationPostalcode},${data.booking.bike.pickupStation?.locationCity}`}
                  >
                    <span className="flex items-center space-x-2">
                      <ExternalLinkIcon className="stroke-current w-4 h-4" />
                      <span>Auf der Karte ansehen.</span>
                    </span>
                  </a>
                </div>
              </div>
              {data.booking.bike.pickupStation?.contactTelephone && (
                <div>
                  <a
                    href={`tel:${data.booking.bike.pickupStation?.contactTelephone}`}
                  >
                    {data.booking.bike.pickupStation?.contactTelephone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
