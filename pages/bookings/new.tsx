import * as React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import {
  addDays,
  addMonths,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  isDate,
} from "date-fns";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";

import DefaultLayout from "@components/layout/DefaultLayout";
import { useAuth, AuthStatus } from "@context/auth";
import {
  useCreateABookingMutation,
  useBookedDatesLazyQuery,
} from "@generated/graphql";

registerLocale("de", de);
interface Values {
  startDate: string;
  pickupTimestamp: string;
  agreeToTerms: boolean;
}

export default function NewBooking() {
  const { authState } = useAuth();
  const router = useRouter();
  const [getBookedDates, { data: bookedDates }] = useBookedDatesLazyQuery();
  const [createBooking, { loading, error }] = useCreateABookingMutation();

  React.useEffect(() => {
    if (authState === AuthStatus.unauthenticated) {
      router.push("/login");
    } else if (authState === AuthStatus.authenticated) {
      getBookedDates({ variables: { bikeId: 1 } });
    }
  }, [authState, router, getBookedDates]);

  async function handleSubmit(
    values: Values,
    { resetForm, setErrors }: FormikHelpers<Values>
  ) {
    const input = {
      startDate: values.startDate,
      pickupTimestamp: values.pickupTimestamp,
    };
    const result = await createBooking({ variables: { input } });
    const uuid = result?.data?.createBooking?.booking?.uuid;
    if (uuid) {
      router.push(`/bookings/${uuid}?success=true`);
    }
  }

  return (
    <DefaultLayout>
      <div className="prose">
        <h1>Neue Buchung</h1>
      </div>
      <div className="flex flex-col justify-center pt-12 sm:px-6 lg:px-8">
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                startDate: addDays(new Date(), 1).toISOString().split("T")[0],
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
                          dateFormat="hh:mm"
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
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500"
                        disabled={!values.agreeToTerms || loading}
                      >
                        Jetzt buchen
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}