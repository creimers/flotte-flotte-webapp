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

import Alert from "components/Alert";
import Button from "components/Button";
import DefaultLayout from "components/layout/DefaultLayout";
import { useAuth, AuthStatus } from "context/auth";
import {
  useCreateABookingMutation,
  useBookedDatesLazyQuery,
  useBikesQuery,
  BikeFragment,
} from "generated/graphql";
import PageTitle from "components/PageTitle";

registerLocale("de", de);
interface Values {
  startDate: string;
  pickupTimestamp: string;
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
    null
  );
  const { data: bikes } = useBikesQuery();

  const [loadBookedDates, { data: bookedDates }] = useBookedDatesLazyQuery({
    nextFetchPolicy: "network-only",
  });
  const [createBooking, { loading }] = useCreateABookingMutation();

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    }
  }, [authState, router, router.asPath]);

  React.useEffect(() => {
    if (bikes?.bikes?.edges.length) {
      setSelectedBike(bikes.bikes.edges[0]?.node!);
    }
  }, [bikes]);

  React.useEffect(() => {
    if (selectedBike) {
      loadBookedDates({ variables: { bikeUuid: selectedBike.uuid } });
    }
  }, [selectedBike]);

  const earliestDate = React.useMemo(() => {
    return getEarliestDate(bookedDates?.bookedDates || []);
  }, [bookedDates]);

  async function handleSubmit(values: Values) {
    const input = {
      startDate: values.startDate,
      pickupTimestamp: values.pickupTimestamp,
      bikeUuid: selectedBike?.uuid!,
    };
    const result = await createBooking({ variables: { input } });
    const uuid = result?.data?.createBooking?.booking?.uuid;
    if (uuid) {
      router.push(`/bookings/${uuid}?success=true`);
    }
  }

  if (authState !== AuthStatus.authenticated) {
    return null;
  }

  return (
    <DefaultLayout>
      <PageTitle title="Neue Buchung" />
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 sm:px-10">
            {bikes?.bikes?.edges && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Fahrrad
                </label>
                <select
                  className="w-full"
                  disabled={bikes.bikes.edges.length === 1}
                  value={selectedBike?.uuid}
                  onChange={(evt) => {
                    const uuid = evt.currentTarget.value;
                    const bike = bikes.bikes?.edges.find(
                      (node) => node?.node?.uuid === uuid
                    );
                    if (bike) {
                      setSelectedBike(bike?.node!);
                    }
                  }}
                >
                  {bikes.bikes.edges.map((node, index) => (
                    <option value={node?.node?.uuid} key={node?.node?.uuid}>
                      {node?.node?.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {selectedBike?.pickupStation?.locationDescription && (
              <Alert
                type="info"
                text={selectedBike?.pickupStation?.locationDescription}
              />
            )}
          </div>
        </div>
      </div>
      {bookedDates !== undefined && (
        <div className="flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 sm:rounded-lg sm:px-10">
              <Formik
                initialValues={{
                  startDate: earliestDate,
                  pickupTimestamp: "09:00",
                  agreeToTerms: false,
                }}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => {
                  let pickupTimestampDate = setHours(
                    addDays(new Date(), 1),
                    parseInt(values.pickupTimestamp.split(":")[0])
                  );
                  pickupTimestampDate = setMinutes(
                    pickupTimestampDate,
                    parseInt(values.pickupTimestamp.split(":")[1])
                  );

                  return (
                    <Form className="space-y-6">
                      <div>
                        <label
                          htmlFor="startDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Datum
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            name="startDate"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            locale="de"
                            dateFormat="dd.MM.yyyy"
                            selected={new Date(values.startDate)}
                            excludeDates={bookedDates?.bookedDates?.map(
                              (d) => new Date(d)
                            )}
                            minDate={new Date()}
                            maxDate={addMonths(new Date(), 1)}
                            onChange={(date) => {
                              if (date) {
                                const d = new Date(date.toString());
                                setFieldValue(
                                  "startDate",
                                  d.toISOString().split("T")[0]
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
                          Abhol-Zeit
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            name="pickupTimestamp"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            locale="de"
                            dateFormat="HH:mm"
                            selected={pickupTimestampDate}
                            onChange={(date) => {
                              if (date) {
                                const d = new Date(date.toString());
                                const hours = getHours(d);
                                const minutes = getMinutes(d);
                                const paddedHours = `${hours}`.padStart(2, "0");
                                const paddedMinutes = `${minutes}`.padStart(
                                  2,
                                  "0"
                                );
                                setFieldValue(
                                  "pickupTimestamp",
                                  `${paddedHours}:${paddedMinutes}`
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="text-xs mt-2">
                          Du kannst den Este-Esel nach der Abholung den ganzen
                          Tag lang nutzen!
                        </div>
                      </div>

                      <div>
                        <label className="prose">
                          <Field type="checkbox" name="agreeToTerms" /> Ich habe
                          die{" "}
                          <Link href="/terms">
                            <a>Nutzungsbedingungen</a>
                          </Link>{" "}
                          gelesen und stimme diesen zu.
                        </label>
                      </div>

                      <div>
                        <Button
                          text="Jetzt Buchen"
                          type="submit"
                          disabled={
                            !values.agreeToTerms ||
                            loading ||
                            !user?.me?.verified
                          }
                          loading={loading}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
