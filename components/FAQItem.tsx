import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  question: string;
  defaultOpen?: boolean;
};

const FAQItem: React.FC<Props> = ({
  children,
  question,
  defaultOpen = false,
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center space-x-2 mb-3">
            {/*
                Use the `open` render prop to rotate the icon when the panel is open
              */}
            <ChevronRightIcon
              className={`${
                open ? "transform rotate-90" : ""
              } w-6 h-6 text-blue-500`}
            />
            <h3 className="text-lg md:text-2xl my-2 text-gray-700 text-left">
              {question}
            </h3>
          </Disclosure.Button>

          <Disclosure.Panel>
            <div className="prose px-5 mb-8">{children}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default FAQItem;
