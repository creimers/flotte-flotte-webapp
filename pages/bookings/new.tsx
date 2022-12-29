import * as React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import {
  addDays,
  addMonths,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
} from "date-fns";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import Alert from "components/Alert";
import Button from "components/Button";
import DefaultLayout from "components/layout/DefaultLayout";
import BikePicker from "components/pages/bookings/new/BikePicker";
import { useAuth, AuthStatus } from "context/auth";
import {
  useCreateABookingMutation,
  useBookedDatesQuery,
  useBikesQuery,
  BikeFragment,
} from "generated/graphql";
import PageTitle from "components/PageTitle";

import { getMaxReturnDate } from "lib/utils";

registerLocale("de", de);
interface Values {
  startDate: string;
  returnDate: string;
  pickupTimestamp: string;
  returnTimestamp: string;
  agreeToTerms: boolean;
}

function getEarliestDate(bookedDates: string[]): string {
  let theDate = null;
  let daysDelta = 0;
  while (theDate === null) {
    const date = addDays(new Date(), daysDelta).toISOString().split("T")[0];
    if (!bookedDates.includes(date)) {
      theDate = date;
      break;
    }
    daysDelta++;
  }
  return theDate;
}

export default function NewBooking() {
  const { authState, user } = useAuth();
  const router = useRouter();
  const [selectedBike, setSelectedBike] = React.useState<null | BikeFragment>(
    null,
  );
  const [{ data: bikes }] = useBikesQuery();

  const [{ data: bookedDates }, loadBookedDates] = useBookedDatesQuery({
    requestPolicy: "network-only",
    pause: true,
    variables: { bikeUuid: selectedBike?.uuid },
  });
  const [{ fetching: loading }, createBooking] = useCreateABookingMutation();

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    }
  }, [authState, router, router.asPath]);

  React.useEffect(() => {
    if (bikes?.bikes?.edges.length) {
      const urlP = new URLSearchParams(window.location.search);
      const bikeUuid = urlP.get("bike");
      if (bikeUuid) {
        const bike = bikes.bikes.edges.find(e => e?.node?.uuid === bikeUuid);
        if (bike) {
          setSelectedBike(bike.node!);
        }
      } else {
        setSelectedBike(
          bikes.bikes.edges.filter(b => b?.node?.active)[0]?.node!,
        );
      }
    }
  }, [bikes]);

  React.useEffect(() => {
    if (selectedBike) {
      loadBookedDates();
    }
  }, [selectedBike, loadBookedDates]);

  const earliestDate = React.useMemo(() => {
    return getEarliestDate(bookedDates?.bookedDates || []);
  }, [bookedDates]);

  const earliestPickupTime = React.useMemo(() => {
    if (selectedBike?.pickupStation?.earliestPickupTime) {
      const [hours, minutes, _seconds] =
        selectedBike?.pickupStation?.earliestPickupTime.split(":");
      return setHours(setMinutes(new Date(), Number(minutes)), Number(hours));
    } else {
      return setHours(setMinutes(new Date(), 9), 0);
    }
  }, [selectedBike]);

  const latestReturnTime = React.useMemo(() => {
    if (selectedBike?.pickupStation?.latestReturnTime) {
      const [hours, minutes, _seconds] =
        selectedBike?.pickupStation?.latestReturnTime.split(":");
      // console.log({ hours, minutes });
      return setHours(setMinutes(new Date(), Number(minutes)), Number(hours));
    } else {
      return setHours(setMinutes(new Date(), 18), 0);
    }
  }, [selectedBike]);

  async function handleSubmit(values: Values) {
    const input = {
      startDate: values.startDate,
      returnDate: values.returnDate,
      pickupTimestamp: values.pickupTimestamp,
      returnTimestamp: values.returnTimestamp,
      bikeUuid: selectedBike?.uuid!,
    };
    const result = await createBooking({ input });
    const uuid = result?.data?.createBooking?.booking?.uuid;
    if (uuid) {
      router.push(`/bookings/${uuid}?success=true`);
    }
  }

  if (authState !== AuthStatus.authenticated) {
    return null;
  }

  const bks = (bikes?.bikes?.edges.map(b => b?.node).filter(Boolean) ||
    []) as BikeFragment[];

  return (
    <DefaultLayout>
      <PageTitle title="Neue Buchung" />
      <div className="mb-8 space-y-8">
        <div>
          {bikes?.bikes?.edges && (
            <BikePicker
              selectedBike={selectedBike}
              bikes={bks}
              handleBikeSelection={setSelectedBike}
            />
          )}
        </div>
        {selectedBike?.statusNote && (
          <Alert
            type={!selectedBike?.active ? "error" : "success"}
            text={selectedBike?.statusNote || "Rad verfügbar."}
          />
        )}
        {selectedBike?.pickupStation?.locationDescription && (
          <Alert
            type="info"
            text={selectedBike?.pickupStation?.locationDescription}
          />
        )}
      </div>
      {bookedDates !== undefined && (
        <Formik
          initialValues={{
            startDate: earliestDate,
            returnDate: earliestDate,
            pickupTimestamp: "09:00",
            returnTimestamp: "18:00",
            agreeToTerms: false,
            agreeToTermsBike: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            let pickupTimestampDate = setHours(
              new Date(values.startDate),
              parseInt(values.pickupTimestamp.split(":")[0]),
            );
            pickupTimestampDate = setMinutes(
              pickupTimestampDate,
              parseInt(values.pickupTimestamp.split(":")[1]),
            );
            let returnTimestampDate = setHours(
              new Date(values.startDate),
              parseInt(values.returnTimestamp.split(":")[0]),
            );
            returnTimestampDate = setMinutes(
              returnTimestampDate,
              parseInt(values.pickupTimestamp.split(":")[1]),
            );

            // const maxReturnDate = addDays(
            //   pickupTimestampDate,
            //   (selectedBike?.pickupStation?.maxConsecutiveDays || 1) - 1,
            // );

            const maxReturnDate = getMaxReturnDate(
              pickupTimestampDate,
              selectedBike?.pickupStation?.maxConsecutiveDays || 1,
              bookedDates?.bookedDates || [],
            );

            return (
              <Form className="sm:grid grid-cols-2 gap-8 space-y-8 sm:space-y-0">
                <div className="bg-teal-100 p-4 rounded space-y-4">
                  <h2 className="flex items-center space-x-2">
                    <ArrowRightOnRectangleIcon className="w-5" />
                    <span>Abholung</span>
                  </h2>
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      An welchem Tag holst du das Rad ab?
                    </label>
                    <div className="mt-1">
                      <DatePicker
                        disabled={!selectedBike?.active}
                        name="startDate"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                        locale="de"
                        dateFormat="dd.MM.yyyy"
                        selected={new Date(values.startDate)}
                        excludeDates={bookedDates?.bookedDates?.map(
                          d => new Date(d),
                        )}
                        // dayClassName={
                        //   // if not today, greater than min, smaller than max and not in booked dates!
                        //   date => {
                        //     const now = new Date();
                        //     const isToday =
                        //       date.toISOString().split("T")[0] ===
                        //       now.toISOString().split("T")[0];
                        //     const nowTime = now.getTime();
                        //     const selectedDate = new Date(values.startDate);
                        //     if (
                        //       !isToday &&
                        //       date.getTime() > nowTime &&
                        //       date !== selectedDate
                        //     ) {
                        //       return "available";
                        //     }
                        //     return "";
                        //   }
                        // }
                        minDate={new Date()}
                        maxDate={addMonths(new Date(), 1)}
                        onChange={date => {
                          if (date) {
                            const d = new Date(date.toString());
                            setFieldValue(
                              "startDate",
                              d.toISOString().split("T")[0],
                            );
                            setFieldValue(
                              "returnDate",
                              d.toISOString().split("T")[0],
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="pickupTimestamp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Um wie viel Uhr?
                    </label>
                    <div className="mt-1">
                      <DatePicker
                        disabled={!selectedBike?.active}
                        name="pickupTimestamp"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                        showTimeSelect
                        showTimeSelectOnly
                        locale="de"
                        dateFormat="HH:mm"
                        selected={pickupTimestampDate}
                        minTime={earliestPickupTime}
                        maxTime={latestReturnTime}
                        onChange={date => {
                          if (date) {
                            const d = new Date(date.toString());
                            const hours = getHours(d);
                            const minutes = getMinutes(d);
                            const paddedHours = `${hours}`.padStart(2, "0");
                            const paddedMinutes = `${minutes}`.padStart(2, "0");
                            setFieldValue(
                              "pickupTimestamp",
                              `${paddedHours}:${paddedMinutes}`,
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-pink-100 p-4 rounded space-y-4">
                  <h2 className="flex items-center space-x-2">
                    <ArrowLeftOnRectangleIcon className="w-5" />
                    <span>Rückgabe</span>
                  </h2>
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      An welchem Tag bringst du das Rad zurück?
                    </label>
                    <div className="mt-1">
                      <DatePicker
                        disabled={!selectedBike?.active}
                        name="startDate"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                        locale="de"
                        dateFormat="dd.MM.yyyy"
                        selected={new Date(values.returnDate)}
                        // excludeDates={bookedDates?.bookedDates?.map(
                        //   d => new Date(d),
                        // )}
                        // includeDates={[]}
                        // min date should be the selected date
                        minDate={pickupTimestampDate}
                        // max date should be the selected date + addDays(pickupDate, maxConsecutiveDays)
                        maxDate={maxReturnDate}
                        onChange={date => {
                          if (date) {
                            const d = new Date(date.toString());
                            setFieldValue(
                              "returnDate",
                              d.toISOString().split("T")[0],
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="pickupTimestamp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Um wie viel Uhr?
                    </label>
                    <div className="mt-1">
                      <DatePicker
                        disabled={!selectedBike?.active}
                        name="pickupTimestamp"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                        showTimeSelect
                        showTimeSelectOnly
                        locale="de"
                        dateFormat="HH:mm"
                        selected={returnTimestampDate}
                        minTime={earliestPickupTime}
                        maxTime={latestReturnTime}
                        onChange={date => {
                          if (date) {
                            const d = new Date(date.toString());
                            const hours = getHours(d);
                            const minutes = getMinutes(d);
                            const paddedHours = `${hours}`.padStart(2, "0");
                            const paddedMinutes = `${minutes}`.padStart(2, "0");
                            setFieldValue(
                              "returnTimestamp",
                              `${paddedHours}:${paddedMinutes}`,
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="prose">
                    <Field type="checkbox" name="agreeToTerms" /> Ich habe die{" "}
                    <Link href="/terms">
                      <a>Nutzungsbedingungen von Flotte Flotte</a>
                      {/* <a>Nutzungsbedingungen</a> */}
                    </Link>{" "}
                    gelesen und stimme diesen zu.
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="prose">
                    <Field type="checkbox" name="agreeToTermsBike" /> Ich habe
                    die{" "}
                    <Link href={`/bikes/${selectedBike?.slug}#terms`}>
                      <a>Nutzungsbedingungen des Rads</a>
                    </Link>{" "}
                    gelesen und stimme diesen zu.
                  </label>
                </div>

                <div className="flex justify-center col-span-2">
                  <div className="max-w-[300px] w-full">
                    <Button
                      text="Jetzt Buchen"
                      type="submit"
                      disabled={
                        !values.agreeToTerms ||
                        // !values.agreeToTermsBike ||
                        loading ||
                        !user?.me?.verified ||
                        selectedBike?.active === false
                      }
                      loading={loading}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </DefaultLayout>
  );
}
