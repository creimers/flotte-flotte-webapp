import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";

import DefaultLayout from "@components/layout/DefaultLayout";
import { AuthStatus, useAuth } from "@context/auth";
import Alert from "@components/Alert";

import { useBookingsLazyQuery } from "@generated/graphql";

export default function Bookings() {
  const { authState } = useAuth();
  const router = useRouter();

  const [getBookings, { loading, data }] = useBookingsLazyQuery({
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    } else if (authState === AuthStatus.authenticated) {
      getBookings();
    }
  }, [authState, router, getBookings]);

  const [showRegistrationSuccess, setShowRegistrationSuccess] =
    React.useState(false);

  React.useEffect(() => {
    if (window.location.search.includes("registered")) {
      setShowRegistrationSuccess(true);
    }
  }, []);

  if (authState === AuthStatus.authenticated) {
    return (
      <DefaultLayout
        title="Buchungen"
        alerts={
          showRegistrationSuccess
            ? [
                <Alert
                  type="success"
                  text="Willkommen!"
                  key={`welcome-alert`}
                />,
              ]
            : []
        }
      >
        <div className="prose my-3">
          <h1>Buchungen</h1>
        </div>
        {!loading && data?.bookings?.edges && !data?.bookings?.edges.length ? (
          <div className="prose">
            <p>Du hast bisher noch keine Buchungen.</p>
            <p>
              Jetzt den Este-Esel{" "}
              <Link href="/bookings/new">
                <a>buchen</a>
              </Link>
              .
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Datum
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Abhol-Uhrzeit
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.bookings?.edges.map((edge, i) => (
                <tr
                  key={edge?.node?.uuid}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {edge?.node?.state === "REQUESTED" && (
                      <CheckCircleIcon className="h-5 w-5 text-gray-500" />
                    )}
                    {edge?.node?.state === "CONFIRMED" && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                    {["REJECTED", "CANCELED"].includes(
                      edge?.node?.state || ""
                    ) && <XCircleIcon className="h-5 w-5 text-red-500" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(edge?.node?.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {edge?.node?.pickupTimestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/bookings/${edge?.node?.uuid}`}>
                      <a>
                        <span className="flex items-center space-x-1">
                          <span>Details</span>
                          <ChevronRightIcon className="w-4 h-4" />{" "}
                        </span>
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* {data?.bookings?.edges.map((edge) => (
          <div key={edge?.node?.uuid}>
            <Link href={`/bookings/${edge?.node?.uuid}`}>
              {edge?.node?.uuid}
            </Link>
          </div>
        ))} */}
      </DefaultLayout>
    );
  }

  return null;
}
