import { Disclosure } from "@headlessui/react";
import { ReactElement } from "../types";

interface AccordeonProps {
  className?: string;
  title: string;
  children: ReactElement;
}

export const Accordeon = ({
  title,
  className = "",
  children,
}: AccordeonProps) => {
  return (
    <Disclosure as="div" className={className}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-max cursor-pointer select-none items-center gap-2">
            <span className="material-symbols-rounded">
              {open ? "expand_less" : "expand_more"}
            </span>
            {title}
          </Disclosure.Button>
          <Disclosure.Panel className="mt-3 rounded-md bg-slate-200 p-3 text-slate-800">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
