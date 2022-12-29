import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";

import Button from "components/Button";

export default function EsteEselModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    const urlP = new URLSearchParams(window.location.search);
    const from = urlP.get("from");
    if (from === "este-esel") {
      setIsOpen(true);
    }
  }, []);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        open={isOpen}
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
                Este-Esel wird Flotte Flotte
              </Dialog.Title>
              <div className="mt-2 prose">
                <p>Liebe Este-Esel-Nutzer:in,</p>
                <p>der Este-Esel ist jetzt Teil der Flotten Flotte.</p>
                <p>
                  <strong>Für dich ändert sich dadurch nichts!</strong>
                </p>
                <p>
                  Du kannst aber mit deinem Este-Esel-Konto ab sofort auch die
                  anderen Lastenräder der Flotten Flotte nutzen.
                </p>
                <p>Viel Spaß und gute Fahrt!</p>
              </div>

              <div className="mt-4 flex space-x-4">
                <Button text="Ok!" onClick={closeModal} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
