import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import {
  BookingFragment,
  useCancelThatBookingMutation,
} from "generated/graphql";
import Button from "./Button";

type Props = {
  booking: BookingFragment;
};
export default function CancelBooking({ booking }: Props) {
  const [{ fetching }, cancelBooking] = useCancelThatBookingMutation();
  let [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  async function handleCancel() {
    await cancelBooking({ bookingUuid: booking.uuid });
    closeModal();
    router.push("/bookings");
  }

  return (
    <>
      <div className="w-64 mt-8">
        <Button
          text="Buchung Stornieren"
          emphasis="negative"
          onClick={openModal}
        />
      </div>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Buchung stornieren
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Möchtest du die Buchung wirklich stornieren?
                  </p>
                </div>

                <div className="mt-4 flex space-x-4">
                  <Button
                    text="Abbrechen"
                    onClick={closeModal}
                    emphasis="neutral"
                    disabled={fetching}
                  />
                  <Button
                    text="Stornieren"
                    onClick={handleCancel}
                    loading={fetching}
                    disabled={fetching}
                    emphasis="negative"
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
