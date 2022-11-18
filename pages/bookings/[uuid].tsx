import * as React from "react";
import { useRouter } from "next/router";

import { useAuth, AuthStatus } from "context/auth";

import Alert from "components/Alert";
import DefaultLayout from "components/layout/DefaultLayout";

import { useBookingDetailsQuery } from "generated/graphql";
import BookingDetails from "components/pages/bookings/details/BookingDetails";

import BookingDetailsLegacy from "components/BookingDetails";
import CancelBooking from "components/CancelBooking";
import PageTitle from "components/PageTitle";
import BackLink from "components/BackLink";

export default function BookingDetail() {
  const { authState } = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const router = useRouter();
  const { uuid } = router.query;

  const [{ data, fetching: loading }, getBookingDetails] =
    useBookingDetailsQuery({
      variables: { uuid: `${uuid}` },
      requestPolicy: "cache-and-network",
    });

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

  const dateInPast =
    new Date(`${data?.booking?.startDate}T${data?.booking?.pickupTimestamp}`) <
    new Date()
      ? true
      : false;

  return (
    <DefaultLayout>
      <div>
        <BackLink href="/bookings" />
      </div>
      <PageTitle title="Buchungs-Details" />
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
      {data?.booking?.state === "REJECTED" && (
        <div className="my-2">
          <Alert text="Die Buchung wurde leider abgelehnt." type="error" />
        </div>
      )}
      {data?.booking?.state === "CANCELED" && (
        <div className="my-2">
          <Alert text="Die Buchung wurde storniert." type="error" />
        </div>
      )}
      {!loading && !dateInPast && data?.booking?.state === "CONFIRMED" && (
        <div className="my-2">
          <Alert
            text="Bitte bringe den Buchungs-Code und deinen Ausweis mit zum Abholen."
            type="info"
          />
        </div>
      )}
      {!loading && dateInPast && data?.booking?.state === "CONFIRMED" && (
        <div className="my-2">
          <Alert
            text="Die Buchung liegt in der Vergangenheit."
            type="warning"
          />
        </div>
      )}
      {data && data.booking && <BookingDetails booking={data.booking} />}
      {/* {data && data.booking && <BookingDetailsLegacy booking={data.booking} />} */}
      {data &&
        data.booking &&
        !dateInPast &&
        data?.booking?.state !== "CANCELED" && (
          <CancelBooking booking={data.booking} />
        )}
    </DefaultLayout>
  );
}
