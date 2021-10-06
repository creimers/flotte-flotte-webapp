import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@components/layout/DefaultLayout";
import { AuthStatus, useAuth } from "@context/auth";

import { useBookingsLazyQuery } from "@generated/graphql";

export default function Bookings() {
  const { authState } = useAuth();
  const router = useRouter();

  const [getBookings, { loading, data, error }] = useBookingsLazyQuery();

  console.log(loading, data, error);

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    } else if (authState === AuthStatus.authenticated) {
      getBookings();
    }
  }, [authState, router, getBookings]);

  if (authState === AuthStatus.authenticated) {
    return (
      <DefaultLayout>
        <div className="prose">
          <h1>Buchungen</h1>
        </div>
        {data?.bookings?.edges.map((edge) => (
          <Link key={edge?.node?.uuid} href={`/bookings/${edge?.node?.uuid}`}>
            {edge?.node?.uuid}
          </Link>
        ))}
      </DefaultLayout>
    );
  }

  return null;
}
