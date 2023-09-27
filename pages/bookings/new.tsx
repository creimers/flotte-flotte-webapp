import * as React from "react";
import { useRouter } from "next/router";

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

import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  startDate: z.string(),
  returnDate: z.string(),
  pickupTimestamp: z.string(),
  returnTimestamp: z.string(),
  bikeUuid: z.string(),
  agreeToTerms: z.boolean(),
  agreeToTermsBike: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

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

function extractTimeString(date: Date): string {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const paddedHours = `${hours}`.padStart(2, "0");
  const paddedMinutes = `${minutes}`.padStart(2, "0");
  return `${paddedHours}:${paddedMinutes}`;
}

export default function NewBooking() {
  const { authState, user } = useAuth();
  const router = useRouter();
  const [{ data: bikes }] = useBikesQuery();

  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
    });

  const bks = (bikes?.bikes?.edges.map(b => b?.node).filter(Boolean) ||
    []) as BikeFragment[];

  const selectedBikeUuid = watch("bikeUuid");
  const selectedBike = bks.find(b => b?.uuid === selectedBikeUuid);

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
          setValue("bikeUuid", bike.node?.uuid);
        }
      } else {
        setValue(
          "bikeUuid",
          bikes.bikes.edges.filter(b => b?.node?.active)[0]?.node?.uuid,
        );
      }
    }
  }, [bikes]);

  React.useEffect(() => {
    if (selectedBike) {
      loadBookedDates();
    }
  }, [selectedBike, loadBookedDates]);

  React.useEffect(() => {
    const earliestDate = getEarliestDate(bookedDates?.bookedDates || []);
    setValue("startDate", earliestDate);
    setValue("returnDate", earliestDate);
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

  React.useEffect(() => {
    setValue("pickupTimestamp", earliestPickupTime.toISOString());
  }, [earliestPickupTime]);

  const latestReturnTime = React.useMemo(() => {
    if (selectedBike?.pickupStation?.latestReturnTime) {
      const [hours, minutes, _seconds] =
        selectedBike?.pickupStation?.latestReturnTime.split(":");
      return setHours(setMinutes(new Date(), Number(minutes)), Number(hours));
    } else {
      return setHours(setMinutes(new Date(), 18), 0);
    }
  }, [selectedBike]);

  React.useEffect(() => {
    setValue("returnTimestamp", latestReturnTime.toISOString());
  }, [latestReturnTime]);

  async function submitForm(values: FormSchema) {
    const input = {
      startDate: values.startDate,
      returnDate: values.returnDate,
      pickupTimestamp: extractTimeString(new Date(values.pickupTimestamp)),
      returnTimestamp: extractTimeString(new Date(values.returnTimestamp)),
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

  const startDate = watch("startDate");

  const agreedToTerms = watch("agreeToTerms");
  const agreeToTermsBike = watch("agreeToTermsBike");

  if (!startDate || !earliestPickupTime) {
    return null;
  }

  const maxReturnDate = getMaxReturnDate(
    new Date(startDate),
    selectedBike?.pickupStation?.maxConsecutiveDays || 1,
    bookedDates?.bookedDates || [],
  );

  return (
    <DefaultLayout>
      <PageTitle title="Neue Buchung" />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-8 space-y-8">
          <div>
            {bikes?.bikes?.edges && (
              <Controller
                name="bikeUuid"
                control={control}
                render={({ field: { onChange } }) => (
                  <BikePicker
                    selectedBike={selectedBike}
                    bikes={bks}
                    handleBikeSelection={bike => {
                      onChange(bike.uuid);
                    }}
                  />
                )}
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
        <div className="sm:grid grid-cols-2 gap-8 space-y-8 sm:space-y-0">
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
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      disabled={!selectedBike?.active}
                      name="startDate"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                      locale="de"
                      dateFormat="dd.MM.yyyy"
                      selected={new Date(value)}
                      excludeDates={bookedDates?.bookedDates?.map(
                        d => new Date(d),
                      )}
                      minDate={new Date()}
                      maxDate={addMonths(new Date(), 1)}
                      onChange={date => {
                        if (date) {
                          const d = new Date(date.toString());
                          const dateAsIsoString = d.toISOString().split("T")[0];
                          onChange(dateAsIsoString);
                          setValue("returnDate", dateAsIsoString);
                        }
                      }}
                    />
                  )}
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
                <Controller
                  name="pickupTimestamp"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      disabled={!selectedBike?.active}
                      name="pickupTimestamp"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                      showTimeSelect
                      showTimeSelectOnly
                      locale="de"
                      dateFormat="HH:mm"
                      selected={new Date(value)}
                      minTime={earliestPickupTime}
                      maxTime={latestReturnTime}
                      onChange={date => {
                        if (date) {
                          const d = new Date(date.toString());
                          onChange(d);
                        }
                      }}
                    />
                  )}
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
                <div className="mt-1">
                  <Controller
                    name="returnDate"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        disabled={!selectedBike?.active}
                        name="startDate"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                        locale="de"
                        dateFormat="dd.MM.yyyy"
                        selected={new Date(value)}
                        excludeDates={bookedDates?.bookedDates?.map(
                          d => new Date(d),
                        )}
                        minDate={new Date(startDate)}
                        maxDate={maxReturnDate}
                        onChange={date => {
                          if (date) {
                            const d = new Date(date.toString());
                            const dateAsIsoString = d
                              .toISOString()
                              .split("T")[0];
                            onChange(dateAsIsoString);
                          }
                        }}
                      />
                    )}
                  />
                </div>
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
                <Controller
                  name="returnTimestamp"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      disabled={!selectedBike?.active}
                      name="pickupTimestamp"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-400"
                      showTimeSelect
                      showTimeSelectOnly
                      locale="de"
                      dateFormat="HH:mm"
                      selected={new Date(value)}
                      minTime={earliestPickupTime}
                      maxTime={latestReturnTime}
                      onChange={date => {
                        if (date) {
                          const d = new Date(date.toString());
                          onChange(d);
                        }
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className="prose">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mr-2"
              />
              Ich habe die{" "}
              <Link href="/terms">
                <a>Nutzungsbedingungen von Flotte Flotte</a>
              </Link>{" "}
              gelesen und stimme diesen zu.
            </label>
          </div>

          <div className="col-span-2">
            <label className="prose">
              <input
                type="checkbox"
                {...register("agreeToTermsBike")}
                className="mr-2"
              />
              Ich habe die{" "}
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
                  !agreedToTerms ||
                  !agreeToTermsBike ||
                  loading ||
                  !user?.me?.verified ||
                  selectedBike?.active === false
                }
                loading={loading}
              />
            </div>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
}
