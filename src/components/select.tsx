"use client";

import { Dispatch, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronExpand } from "./icons";

export interface SelectProps<T> {
  /**
   * The list of items to select.
   * @type {Array<T>}
   */
  items: Array<T>;

  /**
   * A function that for each item in the list returns the item's label.
   * @type {(item: T) => string}
   */
  label: (item: T) => string;

  /**
   * A function that for each item in the list returns the item's unique key.
   * @type {(item: T) => string}
   */
  itemKey: (item: T) => string;

  /**
   * A function that for each item in the list returns the item's value.
   * @type {(item: T) => any}
   */
  value: (item: T) => any;

  /**
   * A function that for each item in the list returns whether the item is disabled.
   * @type {(item: T) => boolean}
   * @default {(item) => false}
   */
  disable?: (item: T) => boolean;

  /**
   * the select item event handler
   * @type {Dispatch<T>}
   */
  change: Dispatch<T>;

  /**
   * Defines if the input is disabled or not.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * The selected item in the list.
   * @type {T | null}
   * @default null
   */
  selected?: T | null;

  /**
   * the select placeholder.
   * @type {string}
   * @default "Select an option"
   */
  placeholder?: string;
}

export default function Select({
  items,
  label,
  itemKey,
  value,
  disable = (_item) => false,
  change,
  disabled = false,
  selected = null,
  placeholder = "Select an option",
}: SelectProps<any>) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={change} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white h-10 py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected ? label(selected) : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {items.map((item) => (
                <Listbox.Option
                  key={itemKey(item)}
                  disabled={disable(item)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary-100 text-primary-900"
                        : "text-gray-900"
                    }`
                  }
                  value={value(item)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {label(item)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <IconCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
