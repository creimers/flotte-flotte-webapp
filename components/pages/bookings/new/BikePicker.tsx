import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { BikeFragment, BikeNode } from "generated/graphql";
import { classNames } from "lib/utils";

type Props = {
  bikes: BikeFragment[];
  selectedBike?: BikeFragment | null;
  handleBikeSelection: (bike: BikeFragment) => void;
};

export default function BikePicker({
  bikes,
  selectedBike,
  handleBikeSelection,
}: Props) {
  return (
    <Listbox value={selectedBike} onChange={handleBikeSelection}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Lastenrad wählen
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-4 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span
                  aria-label={selectedBike?.active ? "Online" : "Offline"}
                  className={classNames(
                    selectedBike?.active ? "bg-green-400" : "bg-gray-200",
                    "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                  )}
                />
                <span
                  className={classNames(
                    "font-normal text-base",
                    "ml-3 block truncate",
                    "inline-flex w-full justify-between pr-4",
                  )}
                >
                  <span>{selectedBike?.name}</span>
                  <span>({selectedBike?.pickupStation?.locationCity})</span>
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {bikes.map(bike => (
                  <Listbox.Option
                    key={bike.uuid}
                    // disabled={!bike?.active}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={bike}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              bike?.active ? "bg-green-400" : "bg-gray-200",
                              "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate",
                              "inline-flex w-full justify-between pr-4",
                            )}
                          >
                            <span>{bike?.name}</span>
                            <span>({bike?.pickupStation?.locationCity})</span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
