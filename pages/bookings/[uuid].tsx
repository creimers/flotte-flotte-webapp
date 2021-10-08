import * as React from "react";
import { useRouter } from "next/router";

import { useAuth, AuthStatus } from "@context/auth";

import Alert from "@components/Alert";
import DefaultLayout from "@components/layout/DefaultLayout";

import { useBookingDetailsLazyQuery } from "@generated/graphql";

import BookingDetails from "@components/BookingDetails";

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
      {data && data.booking && <BookingDetails booking={data.booking} />}
    </DefaultLayout>
  );
}
