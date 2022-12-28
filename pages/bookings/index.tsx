import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import DefaultLayout from "components/layout/DefaultLayout";
import { AuthStatus, useAuth } from "context/auth";
import Alert from "components/Alert";
import PageTitle from "components/PageTitle";

import { useBookingsQuery } from "generated/graphql";

export default function Bookings() {
  const { authState } = useAuth();
  const router = useRouter();

  const [{ fetching: loading, data }, getBookings] = useBookingsQuery({
    requestPolicy: "cache-and-network",
    pause: true,
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
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 justify-between items-center mb-2">
          <div className="flex-1 w-full">
            <PageTitle title="Buchungen" />
          </div>
          <div className="flex-1 w-full flex justify-end">
            <Link href="/bookings/new/">
              <a className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Jetzt buchen
              </a>
            </Link>
          </div>
        </div>
        {!loading && data?.bookings?.edges && !data?.bookings?.edges.length ? (
          <div className="prose">
            <p>Du hast bisher noch keine Buchungen.</p>
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
                  Fahrrad
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
                      edge?.node?.state || "",
                    ) && <XCircleIcon className="h-5 w-5 text-red-500" />}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {edge?.node?.bike?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {edge?.node?.startDate === edge?.node?.returnDate ? (
                      <>
                        {new Date(edge?.node?.startDate).toLocaleDateString()}
                      </>
                    ) : (
                      <>
                        {new Date(edge?.node?.startDate).toLocaleDateString()} -{" "}
                        {new Date(edge?.node?.returnDate).toLocaleDateString()}
                      </>
                    )}
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
